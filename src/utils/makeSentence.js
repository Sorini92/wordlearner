const makeSentence = (array) => {
    return array
                .join(' ')
                .charAt(0)
                .toUpperCase() + 
           array
                .join(' ')
                .slice(1)
                .replace(/\s*([,.])/g, "$1");
}

export default makeSentence;