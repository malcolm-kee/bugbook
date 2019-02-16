function fileToUrl(file) {
  const url = window.URL || window.webkitURL;

  try {
    return url.createObjectURL(file);
  } catch (e) {
    return '';
  }
}

export const loadImage = img =>
  new Promise((fulfill, reject) => {
    const $img = new Image();

    $img.onload = () => fulfill($img);
    $img.onerror = reject;

    $img.src = fileToUrl(img);
  });
