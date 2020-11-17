WAITFORIT_start_ts=$(date +%s)
until [ -f ./dist/stat.json ]; do sleep 1; done
WAITFORIT_end_ts=$(date +%s)
echoerr "stats.json is available after $((WAITFORIT_end_ts - WAITFORIT_start_ts)) seconds"
            
