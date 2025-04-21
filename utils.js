export function setImageToWindowSize(url){
    const height = window.innerHeight;
    // console.log(height);
    return adjustImageSize(url,height);
}
export function setImageTo820(url){
    return adjustImageSize(url,820);
}

//https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_SX300.jpg
export function adjustImageSize(url, height) {
    return url.replace(/_V1_SX\d+/, `_V1_SX${height}`); // Replace "SX<number>" with "SX<innerHeight>"
}
