export const copyTextToClipboard = (text = "") => {
    const el = document.createElement("textarea");
    el.value = text.replace(/(<([^>]+)>)/gi, "");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

export const formattedDate = (date) => {
    const dt = new Date(date);
    return dt.toLocaleDateString();
};
export const formattedDateTime = (date) => {
    const dt = new Date(date);
    return dt.toLocaleString();
};

export const formattedContentString = (text) => {
    const rt = ("" + text).trim().replace(/\n/g, "<br/>");
    return rt;
};
export const formattedCurrency = (price) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(("" + price).replace(/[^0-9.]/g, "")));
};

export const formttedSubstring = (text = "", limit = 40) => {
    return text.length > limit ? text.substr(0, limit) + " ..." : text;
};

export const downloadDoc = (msg, title = "Generated Message") => {
    const header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:v='urn:schemas-microsoft-com:vml' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>";
    const body = `
        <head><meta charset='utf-8'><title>${title}</title></head>
        <body>
          <h1>${title}</h1>
          ${typeof msg === "string" ? msg.replace(/\n/g, "<br/>") : ""}
        </body></html>
      `;
    const sourceHTML = header + body;
    const source =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(sourceHTML);

    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = title + ".doc";
    fileDownload.click();
    document.body.removeChild(fileDownload);
};

export const downloadResultsAsCSV = (results, title = "untitled") => {
	if (results == '') return;
    const blob = new Blob(results, { type : "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = title;
    link.click();
    URL.revokeObjectURL(link.href);
};

export const countWords = (s="") => {
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    return s.split(' ').filter(function(str){return str!="";}).length;
}

const commonFuncs = {
    copyTextToClipboard,
    formattedDate,
    formattedDateTime,
    formattedCurrency,
    formttedSubstring,
    formattedContentString,
    downloadDoc,
    countWords,
};

export default commonFuncs;
