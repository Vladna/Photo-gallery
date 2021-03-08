let idEdit = "";
//Array for storing and test-data
let album = [
  {
    naziv: "album1",
    slike: [
      {
        ime: "Forest",
        url: "img/img1.jpg",
      },
      {
        ime: "Statue",
        url: "img/img2.jpg",
      },
      {
        ime: "Astronaut",
        url: "img/img3.png",
      },

      {
        ime: "Statue",
        url: "img/img2.jpg",
      },
      {
        ime: "Astronaut",
        url: "img/img3.png",
      },
    ],
  },
  {
    naziv: "album2",
    slike: [
      {
        ime: "Forest",
        url: "img/img1.jpg",
      },
      {
        ime: "Statue",
        url: "img/img2.jpg",
      },
      {
        ime: "Astronaut",
        url: "img/img3.png",
      },
    ],
  },
];
//Setting ID's for photos
album.forEach((al) => {
  let optionElementChangeModal = document.createElement("option");
  optionElementChangeModal.innerHTML = al.naziv;
  document.getElementById("album-name").appendChild(optionElementChangeModal);
  let optionElementAddModal = document.createElement("option");
  optionElementAddModal.innerHTML = al.naziv;
  document.getElementById("album-name-upl").appendChild(optionElementAddModal);
});
//function for setting and reseting ID's of images
function setId() {
  let id = 1;
  album.forEach((album) => {
    album.slike.forEach((slika) => {
      slika.id = id;
      id++;
    });
  });
}
setId();

///Creating albums and inserting them in DOM
album.forEach((album) => {
  let createdAlbum = createAlbum(album.naziv, album.slike);
  document.querySelector(".main-container").appendChild(createdAlbum);
});
//function for creating album DOM  element
function createAlbum(nazivAlbuma = "undefined", slike) {
  let album = document.createElement("div");
  album.className = "container album";
  album.id = nazivAlbuma;
  let albumHeader = document.createElement("div");
  albumHeader.className = "header";
  let albumHeaderNaziv = document.createElement("h1");
  //albumHeaderNaziv.innerHTML = nazivAlbuma;
  albumHeader.appendChild(albumHeaderNaziv);
  album.appendChild(albumHeader);

  slike.forEach((slika) => {
    let slikaEl = createPhoto(nazivAlbuma, slika);
    album.appendChild(slikaEl);
  });
  return album;
}
//function for creating photo DOM element
function createPhoto(nazivAlbuma = "undefined", slika) {
  let photoHtmlTag = document.createElement("div");
  photoHtmlTag.className = "photo";
  photoHtmlTag.setAttribute("id", slika.id);
  let slikaLink = document.createElement("a");

  slikaLink.setAttribute("href", slika.url);
  slikaLink.setAttribute("data-lightbox", nazivAlbuma);
  slikaLink.setAttribute("data-title", slika.ime);
  slikaLink.setAttribute("onclick", "rotate(this)");

  let slikaSrc = document.createElement("img");
  slikaSrc.setAttribute("src", slika.url);
  slikaLink.appendChild(slikaSrc);
  let slikaButton = document.createElement("button");
  slikaButton.setAttribute("data-toggle", "modal");
  slikaButton.setAttribute("data-target", "#exampleModal");
  slikaButton.className = "btn";
  slikaButton.setAttribute("onclick", "populateModal(this)");
  let nazivButton = document.createElement("h5");
  nazivButton.innerHTML = "Edit";
  slikaButton.appendChild(nazivButton);
  photoHtmlTag.appendChild(slikaLink);
  photoHtmlTag.appendChild(slikaButton);

  return photoHtmlTag;
}
//function for populating Modal for selected photo
function populateModal(e) {
  idEdit = parseInt(e.parentElement.id);
  album.forEach((a) => {
    a.slike.forEach((s) => {
      if (s.id === +e.parentElement.id) {
        document.getElementById("exampleModalLabel").innerHTML = s.ime;
        document.getElementById("img-name").value = s.ime;
        return;
      }
    });
  });
}
//function for updating exisiting image
function saveChanges() {
  let imageNameUpdate = document.getElementById("img-name");
  let albumEdit = document.getElementById("album-name");

  if (albumEdit.value !== "Default") {
    album.forEach((a) => {
      a.slike.forEach((s, index) => {
        if (s.id === +idEdit) {
          s.ime = imageNameUpdate.value;
          let element = document.getElementById(idEdit);
          element.childNodes[0].setAttribute("data-title", s.ime);

          if (albumEdit.value != a.naziv) {
            a.slike.splice(index, 1);

            document.getElementById(idEdit).remove();
            album.forEach((ar) => {
              if (ar.naziv == albumEdit.value) {
                ar.slike.push(s);
                element.childNodes[0].setAttribute("data-lightbox", ar.naziv);
                document.getElementById(albumEdit.value).appendChild(element);
                reloadId();
              }
            });
          }
          setId();
        }
      });
    });
  }
  document.querySelector("form").reset();
}
//function for reseting Modal form after closing
function onClose() {
  document.querySelector("form").reset();
}

//function for updating image ID-s in the DOM and Array
function reloadId() {
  setId();
  let pomniz = [];
  album.forEach((a) => {
    a.slike.forEach((s) => {
      pomniz.push(s.id);
    });
  });
  let cl = Array.from(document.querySelectorAll(".photo"));
  cl.forEach((c, index) => {
    c.id = pomniz[index];
  });
}
//function for saving new Image after adding it
function saveImage() {
  console.log("ra");
  let newImageUrl = document.getElementById("img-upload");
  let newImageAlbumName = document.getElementById("album-name-upl");
  let newImageName = document.getElementById("new-img-name");
  if (newImageName.value == "") {
    newImageName.value = "photo";
  }

  let newImageObject = {
    ime: newImageName.value,
    url: newImageUrl.src,
  };

  album.forEach((a) => {
    if (a.naziv == newImageAlbumName.value) {
      a.slike.push(newImageObject);
      setId();
    }
  });
  let pr = document.getElementById(newImageAlbumName.value);
  pr.appendChild(createPhoto(newImageAlbumName.value, newImageObject));
  document.querySelector("form").reset();
}

//lightbox settings

lightbox.option({
  resizeDuration: 350,
  wrapAround: true,
});
//adding new image meethod
document
  .querySelector('input[type="file"]')
  .addEventListener("change", function () {
    if (this.files && this.files[0]) {
      let img = document.querySelector("img");
      img.src = URL.createObjectURL(this.files[0]);
      img.style.width = 600;
    }
  });

//rotate image function/not finished
function rotate(e) {
  console.log(e);
  let imgr = document.querySelector(".lb-container");
  imgr.setAttribute("onclick", "rotateImg(this)");
}

//rotate image function
function rotateImg(e) {
  console.log(e);
  e.childNodes[0].style = "transform: rotate(360deg);";
  setTimeout(() => {
    e.childNodes[0].style.transform = null;
  }, 1000);
}
