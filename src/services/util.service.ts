export const utilService = {
    getRandomInt,
    getRandomAttackFactor,
    saveToStorage,
    loadFromStorage
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomAttackFactor() {
    return Math.random() * (0.7 - 0.3) + 0.3
}

function saveToStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key: string): any {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}