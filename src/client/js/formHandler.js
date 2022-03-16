async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    try{
        //sending formText (users input into form) over to server side, then awaiting for a response to update the UI
        const returnedData = await ClientSidePost ('/http://localhost:8080/api', formText)
        //updating the UI with returned data
        document.getElementById('score_tag').innerHTML = returnedData.score_tag
        document.getElementById('agreement').innerHTML = returnedData.agreement
        document.getElementById('subjectivity').innerHTML = returnedData.subjectivity
        document.getElementById('confidence').innerHTML = returnedData.confidence
        document.getElementById('irony').innerHTML = returnedData.irony

    }catch (error){
        console.log("Error", error)
    }

}



//client side post request 
const ClientSidePost = async (url ='', data = {})=>{
    console.log(data)
    const response = await fetch (url , {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log(url)
    try{
        const newData = await response.json();
        console.log(newData);
        return(newData);
    } catch (error){
        console.log("Error", error)
    }
};




export { handleSubmit }
