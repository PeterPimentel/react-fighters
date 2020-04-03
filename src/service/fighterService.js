export const index = async () => {
    let response = await fetch("/api/fighters");

    if (response.ok) {
        let json = await response.json();
        return json
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

export const show = async (id) => {
    let response = await fetch(`/api/fighters/${id}`);

    if (response.ok) {
        let json = await response.json();
        return json
    } else {
        alert("HTTP-Error: " + response.status);
    }
}