function allKeysPresent(object={}, requiredKeysList=[]) {
    let keysList = null;
    try{
        keysList = Object.keys(object);
    } catch(err){
        console.log(`received ${object}, which is/may not be object`);
    }

    let flag=true;

    if(keysList){
        if(requiredKeysList.length!==0)
            requiredKeysList.forEach((keyName) => {
               if(!keysList.includes(keyName))
               {
                    flag=false;
               }
            })
        else
            return false;
    }
    else{
        return false;
    }
    return flag; 
}


module.exports={
    allKeysPresent
}