function getColor(theme) {
    let color;

    switch (theme) {
        case 'light':
            color = {
                base: "#000000",
                sec: "#3f3f3f",
                neut: "#f0f0f0",
                oppBase: "#F0F0F0",
                oppSec: "#CCCCCC",
                oppNeut: "#101010",
                warn: "#FF6565",
                dark: '#000',
                light: '#fff'
            };
            break;
        case 'dark':
            color = {
                base: "#FFFFFF",
                sec: "#CCCCCC",
                neut: "#7f7f7f",
                oppBase: "#000000",
                oppSec: "#3f3f3f",
                oppNeut: "#FFFFFF",
                warn: "#FF6565",
                dark: '#000',
                light: '#fff'
            };
            break;
        case 'green':
            color = {
                base: "#76F3CD",
                sec: "#D8FFE5",
                neut: "#f9f9f9",
                oppBase: "#001105",
                oppSec: "#003305",
                oppNeut: "#F7F7F7",
                warn:"#FF6565",
                dark: '#000',
                light: '#fff'
            };
            break;
        default:
            color = {
                base: "#76F3CD",
                sec: "#D8FFE5",
                neut: "#f9f9f9",
                oppBase: "#001105",
                oppSec: "#003305",
                oppNeut: "#F7F7F7",
                warn:"#FF6565",
                dark: '#000',
                light: '#fff'
            };
    }

    return color;
}

let test = {

        base: "#76F3CD",
        sec: "#D8FFE5",
        neut: "#f9f9f9",
        oppBase: "#001105",
        oppSec: "#003305",
        oppNeut: "#363636",
        warn: "#FF6565",
        dark: '#000',
        light: '#fff'
 };
    



export { getColor };
