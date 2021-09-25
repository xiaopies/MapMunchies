function wrapInfoWindowText(str){
    return "<span class='info_window_text'>" + str + "</span>";
}
// assume {{% csrf_token %}} already generated
function getCSRF() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, "csrftoken".length + 1) === ("csrftoken" + '=')) {
                cookieValue = decodeURIComponent(cookie.substring("csrftoken".length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
