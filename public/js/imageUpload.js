FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )
  FilePond.parse(document.body);

const inputElement = document.querySelector('input[type="file"]');

FilePond.setOptions({
  stylePanelAspectRatio:0/100,
  imageResizeTargetheight:0,
  imageResizeTargetWidth:100
  })


// create a FilePond instance at the input element location
const pond = FilePond.create( inputElement)
