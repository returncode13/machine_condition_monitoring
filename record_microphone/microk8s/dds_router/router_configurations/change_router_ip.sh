#https://stackoverflow.com/a/46645799/7835192
#the issue with underscores and dashes  https://stackoverflow.com/questions/37344329/jq-not-working-on-tag-name-with-dashes-and-numbers
#install jq usign apt-get install -y jq

# This uses/requires the PyYAML library; "pip install PyYAML"
yaml2json() {
  /usr/bin/python3 -c 'import yaml, json, sys; print (json.dumps(yaml.safe_load(sys.stdin)))'
}

editYaml() {
  local file=$1; shift
  local tempfile=$(mktemp "${file}.XXXXXX")
  local retval

  if jq "$@" < <(yaml2json <"$file") >"$tempfile"; then
    chmod --reference="$file" -- "$tempfile" # on GNU systems, preserve permissions
    mv -- "$tempfile" "$file"
  else
    retval=$?
    rm -f -- "$tempfile"
    return "$retval"
  fi
}

newDomain=$2
newPort=$3

editYaml $1 --arg newDomain "$newDomain" '.participants[1]."listening-addresses"[0].domain = $newDomain'
editYaml $1 --arg newPort "$newPort" '.participants[1]."listening-addresses"[0].port = $newPort'