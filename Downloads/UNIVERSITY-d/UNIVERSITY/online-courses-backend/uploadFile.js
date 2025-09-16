// بىر فايىل يۈكلەش
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  console.log(result);
}

// كۆپ فايىل يۈكلەش
async function uploadMultipleFiles(files) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  const response = await fetch('http://localhost:5000/upload-multiple', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  console.log(result);
}
