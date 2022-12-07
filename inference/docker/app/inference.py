
#Read from url : localhost:8000/data  :
#create a list of predictions for each file in the url
#Output predictions to new URL : localhost:8001/predictions

########################################################################
# import default libraries
########################################################################
import os
import csv
import sys
import gc
########################################################################


########################################################################
# import additional libraries
########################################################################
import numpy as np
import scipy.stats
# from import
from tqdm import tqdm
from sklearn import metrics
try:
    from sklearn.externals import joblib
except:
    import joblib

# original lib
import common as com
import keras_model



if __name__ == "__main__":
    ##LOGIC
    # select data
    # select model
    # select score distribution
    # get decision threshold from score distribution
    # model prediction for each of the file
    # calculate MSE for each
    # if ypred > decision_threshold, anomaly
    # else normal 
    

    DATA_URL="https://localhost:8000/data"
    #model selection
    model_file = "/models/"
    if not os.path.exists(model_file):
        com.logger.error("{} model not found ".format(machine_type))
        sys.exit(-1)
    model = keras_model.load_model(model_file)
    model.summary()

    #score distribution
    # load anomaly score distribution for determining threshold
    score_distr_file_path = "/score_distributions/"
    shape_hat, loc_hat, scale_hat = joblib.load(score_distr_file_path)

    # determine threshold for decision
    decision_threshold = scipy.stats.gamma.ppf(q=param["decision_threshold"], a=shape_hat, loc=loc_hat, scale=scale_hat)

    #get data
    data="/data/"

    