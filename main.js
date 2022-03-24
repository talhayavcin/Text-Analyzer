// Selectors
let letterCount = document.getElementById('number-of-letters');
let wordsCount = document.getElementById('word-count');
let longWord = document.getElementById('longest-word');
let averageLength = document.getElementById('average-word-length');
let readingDurations = document.getElementById('reading-duration');
let medianLengths = document.getElementById('median-word-length');
let sortedMedianLength = document.getElementById('median-word')
let textLanguages = document.getElementById('text-language');
let commonWords = document.getElementById('most-common-words');

const textArea = document.querySelector('.text-entry textarea');
const analyzeButton = document.getElementById('button');


const countWords = (text) => {
    text = text.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    text = text.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    text = text.replace(/\n /,"\n"); // exclude newline with a start spacing
    return text.split(' ').filter(function(str){return str!="";}).length;
}


// TR: Önce textdeki kelimeleri ayırdık, değişkenlerimizi tanımladık. Önce döngümüzü başlattık sonra kaç tane kelimemiz varsa o kadar döndürüyoruz. Eğer longest değerimiz döngüye giren kelimeden kısaysa yeni en uzun değerimiz döngüye giren kelimemiz oluyor. Bu döngüyü devam ettirip en sonunda bastırıyoruz.

// EN: First, we separated the words in the text and defined our variables. First we start our loop, then we rotate as many words as we have. If our longest value is shorter than the looping word, our new longest value is our looping word. We continue this cycle and finally suppress it.

const longestWord = (text) => {
    let str = text.split(' '); 
    let longest = 0; 
    let word = null; 

    for (let i = 0; i < str.length; i++) { 
        if (longest < str[i].length) {
            longest = str[i].length;  
            word = str[i];   
        }
    }
    return word;
}

// TR: Text'de kaç tane kelime olduğunu aldık. Ortalama kelimemize 0 değerini atadık. Text içindeki kelimeleri aldık. Oluşturduğumuz arraydeki bütün kelimelerin uzunluklarını topluyoruz. Ortalama değer bulurken toplam harf sayımızı kelime sayımıza bölüyoruz.

// EN: We got how many words are in Text. We assigned the value 0 to our average word. We got the words in the text. We add the lengths of all the words in the array we created. When finding the average value, we divide the total number of letters by the number of words.

const lengthAverage = (text) => {
    let wordCount = text.split(' ').length; 
    let wordAverage = 0; 
    let wordArray = text.split(' '); 
    for (let i = 0; i < wordCount; i++) { 
        wordAverage += wordArray[i].length; 
    }
    let avgLen = wordAverage / wordCount;
    return Number(avgLen.toFixed(2)); 
}

// TR: Toplam kelime sayısını aldık. Toplam kelime sayısını 200'e böldük. Ondalıktan önceki sayı dakikamız. Ondalıktan sonraki sayıyı da aldık ve ikisini toplayıp 100'le çarpıp okuma süremizi buluyoruz. İnternette nasıl hesaplanacağı ile ilgili böyle bir bilgi buldum.

// EN: We got the total word count. We divided the total number of words by 200. The number before the decimal is our minute. We also get the number after the decimal point and add the two and multiply by 100 to get the reading time. I found such information on the Internet on how to calculate it.

const readingDuration = (text) => {
    let wordCount = text.split(' ').length;
    let x = wordCount / 200;
    let readingMinute =  Math.floor(x);
    console.log(readingMinute);
    let readingSeconds = x - Math.floor(x);
    return (readingMinute + readingSeconds)*100;
 }

// TR: Kelimelerimizi tek tek ayırdık. Burda kelime sayımızın çift ve tek olması durumuna göre fonksiyon yazdık. Tekse direkt ortadaki değerimiz Eğer çiftse bölüm değerimiz ile bir fazlasını aldık.

// EN: We separated our words one by one. Here, we wrote a function according to whether our word count is even or odd. If odd, our middle value directly. If it is even, we got one more with our quotient value.

const medianLength = (text) => {
    let wordCount = text.split(' ').length;
    let numberArray = [];
    let wordArray = text.split(' ');
    for (let i = 0; i < wordCount; i++) {
        numberArray.push(wordArray[i].length);
    }
    let middle = Math.floor((numberArray.length - 1) / 2);
    if (numberArray.length % 2) {
        return numberArray[middle];
    } else {
        return (numberArray[middle] + numberArray[middle + 1]) / 2.0;
    }
}

// TR: Yukarıda yaptığımız örneğin sıralanmış halini yaptık bu fonksiyonda
// EN: We made the sorted version of the example we made above in this function.

const medianLengthSorted = (text) => {
    let wordCount = text.split(' ').length;
    let numberArray = [];
    let wordArray = text.split(' ').sort();
    console.log(wordArray);
    for (let i = 0; i < wordCount; i++) {
        numberArray.push(wordArray[i].length);
    }
    let middle = Math.floor((numberArray.length - 1) / 2);
    if (numberArray.length % 2) {
        return numberArray[middle];
    } else {
        return (numberArray[middle] + numberArray[middle + 1]) / 2.0;
    }
}
 
// TR: Bu fonksiyonumuzda tek tek bütün kelimelerin uzunluklarına bakıp en çok tekrar edeni bulduk. Bunu yaparken değerleri bir değişkendi mevcut tutarak kaybetmedik.

// EN: In this function, we looked at the lengths of all the words one by one and found the most repetitive ones. While doing this, we did not lose the values ​​by keeping them as a variable.


const mostCommon = (text,num) => {
    const txtArr = text.split(' ');
    const map = {}
    txtArr.forEach(word => {
        if(map.hasOwnProperty(word)){
            map[word]++;
        }else {
            map[word] = 1;
        }
    });
    const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
    frequencyArr.sort((a, b) => b[1] - a[1]);
    return frequencyArr.slice(0, num).map(el => el[0]);
}

analyzeButton.addEventListener('click', () => {
    let text = textArea.value;
    letterCount.innerHTML = text.length;
    wordsCount.innerHTML = countWords(text);
    longWord.innerHTML = longestWord(text);
    averageLength.innerHTML = lengthAverage(text);
    readingDurations.innerHTML = readingDuration(text);
    commonWords.innerHTML= mostCommon(text,5);
    medianLengths.innerHTML = medianLength(text);
    sortedMedianLength.innerHTML = medianLengthSorted(text);
});
