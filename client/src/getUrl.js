export default function getUrl(s) {
    s = s.trim("/")
    if (window.location.origin.indexOf("http://localhost:3000") >= 0) {
        return "http://localhost:8000" + s ;
    } else {
        return window.location.origin + s;
    }
}