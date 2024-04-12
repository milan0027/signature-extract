//js file for homepage, handles logics for showing signatures and status
const resultDiv = document.getElementById('result-list')
const uploadBtn = document.getElementById('upload_btn')
const statusText = document.getElementById('status-text')
$(document).ready(function(){
    $("#upload_btn").click(function(){
        uploadBtn.setAttribute('disabled', 'disabled')
        var fd = new FormData();
        var files = $('#inputFile')[0].files[0];
        fd.append('image',files);
        statusText.innerText = 'Detecting...'
        $.ajax({
            url: '/detect',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    //console.log(response)
                    statusText.innerText = `${response.result.length} signatures detected`
                    while (resultDiv.firstChild) {
                        resultDiv.removeChild(resultDiv.lastChild);
                    }
                    response.result.forEach((item, index) => {
                        const cdiv = document.createElement('div');
                        const img = document.createElement('img');
                        const atag = document.createElement('a');
                        const abtn = document.createElement('button');
                        const hr = document.createElement('hr');
                        abtn.innerText = 'Download';
                        atag.href = `data:image/jpeg;base64,${item}`;
                        atag.download = '';
                        atag.appendChild(abtn);
                        img.src = `data:image/jpeg;base64,${item}`;
                        img.width = 125;
                        cdiv.appendChild(img);
                        cdiv.appendChild(atag);
                        resultDiv.appendChild(cdiv)
                    })
                    uploadBtn.removeAttribute('disabled')
                }else{
                    statusText.innerText = 'Error'
                    uploadBtn.removeAttribute('disabled')
                }
            },
        });
    });
});