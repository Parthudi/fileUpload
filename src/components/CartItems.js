export const addItem = ( item , next ) => {

    let photos = [];
    if(typeof window !== "undefined"){
        if(localStorage.getItem("photos")) {
            photos = JSON.parse(localStorage.getItem('photos'));
        }
    }

    photos.push({ ...item })

    // REMOVES DUPLICATES FROM ARRAY !!

    //Array.from() ---- this will create a new array,
    //new Set(photos) ---- this will store items in that array
    //this below whole will remove the duplicates from the array if exists;
    photos = Array.from(new Set(photos.map(p => p._id))).map(id => {
        return photos.find(p => p._id === id);
    });
    photos = photos.length == 0 ? [] : photos;  
    localStorage.setItem("photos", JSON.stringify(photos));
}

export const itemTotal = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("photos")) {
            return JSON.parse(localStorage.getItem('photos')).length;
        }
    }
    return 0;
}

export const getphotos = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("photos")) {
            return JSON.parse(localStorage.getItem('photos'));
        }
    }
    return [];
}

export const updatephotos = (id, count) => {
    let photos = [];
    if(typeof window !== "undefined"){
        if(localStorage.getItem("photos")) {
            photos = JSON.parse(localStorage.getItem('photos'));
        }
    }
    photos.map((product, i) => {
        if(product._id === id){
            photos[i].count = count;
        }
    })

    localStorage.setItem("photos" , JSON.stringify(photos));
}

export const removeItemphotos = (id) => {
    let photos = [];
    if(typeof window !== "undefined"){
        if(localStorage.getItem("photos")) {
            photos = JSON.parse(localStorage.getItem('photos'));
        }
    }
    console.log(photos.length);

    photos.map((product, i) => {
        if(product._id === id) {
            photos.splice(i, 1);
        }
    })

    localStorage.setItem("photos" , JSON.stringify(photos));

    return photos; 
}

