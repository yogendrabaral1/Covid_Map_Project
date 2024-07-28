export const updateData = (data) => {
    return {
        type: 'UPDATE',
        data
    }
}

export const updateTooltip = (data) => {
    return {
        type: 'TOOLTIP',
        data
    }
}

export const updateMinMax = (data) => {
    return {
        type: 'MINMAX',
        data
    }
}

