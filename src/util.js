export function getMapRadius(country,caseType) {

    let multiplier = 0.05;

    if (caseType === 'cases') {
        multiplier = 0.05;
    }

    if (caseType === 'deaths') {
        multiplier = 0.2;
    }

    if (caseType === 'recovered') {
        multiplier = 0.06;
    }

    const radius = Math.sqrt(country[caseType]) * multiplier;
    return radius
}

export function getFillColor(caseType) {
    let fillColor = 'rgba(255,0,0)'
    let borderColor = "red"

    if (caseType === 'cases') {
        fillColor = 'rgba(255,0,0,0.5)'
        borderColor = "red"
    }
    if (caseType === 'recovered') {
        fillColor = 'rgba(0,255,0,0.5)'
        borderColor = 'green'
    }
    if (caseType === 'deaths') {
        fillColor = 'rgba(255,160,0,0.5)'
        borderColor = 'orange'
    }

    return {fillColor, borderColor}
}

export function sortData(data) {
    const result = data.sort((a, b) => b.cases - a.cases)
    return result
}
