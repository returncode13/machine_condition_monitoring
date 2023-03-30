import rclpy
from rclpy.node import Node

#from std_msgs.msg import UInt8MultiArray
from audio_common_msgs.msg import AudioData

import wave
import time
from pydub import AudioSegment
import numpy as np
import configparser
import os

class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            AudioData,
            'audio',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning
        self.frames = []
        self.starttime = time.time()
        self.config = configparser.ConfigParser()

        self.config.read('src/datastore_collector/data_collector_node.ini')
        #self.get_logger().info(str(self.config.sections()))
       
        
        
    def listener_callback(self, msg):
        self.frames.append(msg.data)

        laptime = round((time.time() - self.starttime), 2)
        self.get_logger().info('Collecting input for "%s"  seconds' %laptime)
        if laptime >= int(self.config['DEFAULT']['clip_duration'].strip()):
            self.get_logger().info('Collected 10 sec data, now saving file')
            self.starttime = time.time()
            self.save_file()


    def save_file(self):
        t = time.localtime()
        current_time = time.strftime("%H_%M_%S", t)        

        audio_segment = AudioSegment(
            np.asarray(self.frames).tobytes(), 
            frame_rate=int(self.config['AudioInfo']['frame_rate'].strip()),
            sample_width=int(self.config['AudioInfo']['sample_width'].strip()), 
            channels=int(self.config['AudioInfo']['channels'].strip()) 
        )    
        audio_segment.export(self.config['DEFAULT']['clip_file_path']+current_time+'.'+self.config['DEFAULT']['clip_format'], format=self.config['DEFAULT']['clip_format'])  


def main(args=None):
    print("Initializing listener node...")
    rclpy.init(args=args)

    minimal_subscriber = MinimalSubscriber()

    rclpy.spin(minimal_subscriber)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    #minimal_subscriber.destroy_node()
    #rclpy.shutdown()


if __name__ == '__main__':
    main()