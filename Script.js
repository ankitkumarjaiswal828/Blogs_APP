function handleSubmit(event) {
  event.preventDefault();
  let url = event.target.img.value;
  let title = event.target.title.value;
  let des = event.target.Description.value;
  let obj = {
    url,
    title,
    des,
  };
  axios
    .post(
      "https://crudcrud.com/api/51b6840cbe5248dd8edb8357a57bceb8/title",
      obj
    )
    .then((resp) => {
      ShowOnScreenData(resp.data);
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`https://crudcrud.com/api/51b6840cbe5248dd8edb8357a57bceb8/title`)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        ShowOnScreenData(response.data[i]);
        console.log(response.data[i].rating);
      }
    })
    .catch((err) => console.log(err));
});

function ShowOnScreenData(obj) {
  user = {
    _id: "",
    url: "",
    title: "",
    des: "",
  };
  //console.log(obj._id+"--")
  let prtEle = document.getElementById("fdb");

  let childtit = document.createElement("h3");
  childtit.textContent = obj.title;

  let chidImg = document.createElement("img");
  chidImg.src = obj.url;
  chidImg.width = "200";
  chidImg.height = "200";
  chidImg.textContent = obj.title + " " + obj.url + " " + obj.des;

  let childDesc = document.createElement("p");
  childDesc.textContent = obj.des;

  //del btn
  let delbtn = document.createElement("input");
  delbtn.type = "button";
  delbtn.className = "del";
  delbtn.value = "Delete";
  delbtn.style.marginRight = "10px";
  delbtn.id = user._id;
  delbtn.onclick = () => {
    deleteData(obj._id);
  };

  //edit btn
  let edtbtn = document.createElement("input");
  edtbtn.className = "edt";
  edtbtn.value = "Edit";
  edtbtn.type = "button";
  edtbtn.onclick = () => {
    editData(obj._id);
    //prtEle.removeChild(chidLst);
    document.getElementById("img").value = obj.url;
    document.getElementById("title").value = obj.title;
    document.getElementById("Description").value = obj.des;
    deleteData(obj._id);
  };

  prtEle.appendChild(childtit);
  prtEle.appendChild(chidImg);
  prtEle.appendChild(childDesc);
  prtEle.appendChild(delbtn);
  prtEle.appendChild(edtbtn);
}

function deleteData(userId) {
  axios
    .delete(
      `https://crudcrud.com/api/51b6840cbe5248dd8edb8357a57bceb8/title/${userId}`
    )
    .then((res) => refresh())
    .catch((err) => console.log(err));
}

function editData(userId, url, title, des) {
  axios
    .put(
      `https://crudcrud.com/api/51b6840cbe5248dd8edb8357a57bceb8/title/${userId}`,
      {
        url,
        title,
        des,
      }
    )
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}

function refresh() {
  axios
    .get(`https://crudcrud.com/api/51b6840cbe5248dd8edb8357a57bceb8/title`)
    .then((response) => {
      let prtEle = document.getElementById("fdb");
      prtEle.innerHTML = "";
      for (let i = 0; i < response.data.length; i++) {
        ShowOnScreenData(response.data[i]);
      }
    })
    .catch((err) => console.log(err));
}

function counter() {
  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get(`https://crudcrud.com/api/51b6840cbe5248dd8edb8357a57bceb8/title`)
      .then((response) => {
        console.log(response.data.length);
      })
      .catch((err) => console.log(err));
  });
}
let blog = counter();
console.log(blog);
