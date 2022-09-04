const apiCall = async({
    url, 
    method = "get",
    body, 
    headers
}) => {
    try{
        const response = await fetch(url, {
            method, 
            body,
            headers
        });

        return response.json();
    }catch(err){
        Promise.reject(err)
    }
}

export {
    apiCall
}