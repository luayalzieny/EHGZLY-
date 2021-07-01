FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
)
FilePond.parse(document.body);

const inputElement = document.querySelector('input[type="file"]');

const inputElement2 = document.getElementById('inpUpload12323123232');

FilePond.setOptions({
stylePanelAspectRatio:10/100,
imageResizeTargetheight:150,
imageResizeTargetWidth:100
})


// create a FilePond instance at the input element location
const pond = FilePond.create( inputElement)
const pond2 = FilePond.create( inputElement2)
