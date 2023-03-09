export const downLoadFile = (type: string, text: any) => {
    const dataStr = `data:application/${type};charset=utf-8,` + encodeURIComponent(text);
    const download = document.createElement('a');
    download.setAttribute('href', dataStr);
    download.setAttribute('download', 'aTools.' + type);
    document.body.appendChild(download);
    download.click();
    download.remove();
}
