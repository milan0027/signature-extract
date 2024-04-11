const resultDiv = document.getElementById('result-list')
const uploadBtn = document.getElementById('upload_btn')
$(document).ready(function(){
    $("#upload_btn").click(function(){
        uploadBtn.setAttribute('disabled', 'disabled')
        var fd = new FormData();
        var files = $('#inputFile')[0].files[0];
        fd.append('image',files);
        $.ajax({
            url: '/detect',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    //console.log(response)
                    while (resultDiv.firstChild) {
                        resultDiv.removeChild(resultDiv.lastChild);
                    }
                    response.result.forEach((item, index) => {
                        const img = document.createElement('img');
                        img.src = `data:image/jpeg;base64,${item}`;
                        img.width = 100;
                        resultDiv.appendChild(img)
                    })
                    uploadBtn.removeAttribute('disabled')
                }else{
                    alert('Error');
                    uploadBtn.removeAttribute('disabled')
                }
            },
        });
    });
});