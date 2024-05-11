function getColor(theme) {
    let color;

    switch (theme) {
        case 'light':
            color = {
                primary: "#000000",
                backPry: "#333333",
                backSec: "#000000",
                alert: "#000000",
                darkPry: "#FFFFFF",
                darkSec: "#CCCCCC",
                light: "#000000",
            };
            break;
        case 'dark':
            color = {
                primary: "#FFFFFF",
                backPry: "#CCCCCC",
                backSec: "#FFFFFF",
                alert: "#FFFFFF",
                darkPry: "#000000",
                darkSec: "#333333",
                light: "#FFFFFF",
            };
            break;
        default:
            color = {
                primary: "#76F3CD",
                backPry: "#D8FFE5",
                backSec: "#f9f9f9",
                alert:"#FF6565",
                darkPry: "#001105",
                darkSec: "#1E1E1E",
                light: "#F7F7F7",
            };
    }

    return color;
}

export { getColor };
