export const fileUsage = {
    saveFile: (name, data)=>{
        const fileName = `${name}.json`
        const file = new Blob([data], {type: 'json'})
        const url = document.createElement("a");
        url.href = URL.createObjectURL(file)
        url.download = fileName;
        url.click();
        url.remove();
    },
    loadFile: async (event: any)=>{
        const file:File = event.target.files[0];
        const uploadFileName = file.name;
        const data = await file.text();
        return data;
    }
}