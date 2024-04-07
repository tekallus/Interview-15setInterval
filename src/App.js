import React, { useState, useEffect } from "react";

function App() {
  return <WordByWord />;
}

const WordByWord = () => {
  // State hook'larını kullanarak bileşenin durumunu yönetiyoruz.
  const [text, setText] = useState(""); // Metni tutacak state
  const [words, setWords] = useState([]); // Giriş metnini kelimelere ayırıp saklayacak state
  const [currentIndex, setCurrentIndex] = useState(0); // Gösterilen kelimenin indexini tutacak state

  // useEffect hook'u, bileşenin her yeniden render edildiğinde çalışacak olan efekti tanımlar.
  useEffect(() => {
    // setInterval fonksiyonu, belirli bir aralıkla tekrarlanan bir işlevi çalıştırmak için kullanılır.
    const interval = setInterval(() => {
      // Eğer gösterilecek kelime, kelimeler listesinin son indeksinden küçükse:
      if (currentIndex < words.length) {
        // Metin state'ini, önceki metin ve şuanki kelimeyi birleştirerek güncelle
        setText((prevText) => prevText + " " + words[currentIndex]);
        // Şuanki kelimenin indeksini bir arttır
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        // Eğer gösterilecek kelime kalmadıysa, aralığı temizle
        clearInterval(interval);
      }
    }, 500); // Her yarım saniyede bir işlem yapılacak

    // useEffect hook'u temizleme işlevi döndürür. Bu, bileşen kaldırıldığında interval'i durdurmak için kullanılır.
    return () => clearInterval(interval);
  }, [currentIndex, words]); // useEffect, currentIndex veya words değiştiğinde çalışacak

  // Kullanıcı girişi değiştiğinde çalışacak olan işlev
  const handleInputChange = (event) => {
    // Kullanıcı girişini al
    const inputText = event.target.value;
    // Giriş metnini kelimelere ayır
    const inputWords = inputText.split(" ");
    // Metin state'ini sıfırla
    setText("");
    // Kelimeler state'ini güncelle
    setWords(inputWords);
    // Şuanki kelime indeksini sıfırla
    setCurrentIndex(0);
  };

  // Bileşen render ediliyor
  return (
    <div className="flex flex-col items-center h-screen">
      {/* 
    1- bir <div> öğesini tanımlar.
    className özelliği, içinde bulunan sınıfları belirtir.
    flex sınıfı, içeriğin yatay düzlemde hizalanmasını sağlar.
    justify-center sınıfı, içeriği yatay eksende merkeze hizalar.
    items-center sınıfı, içeriği dikey eksende merkeze hizalar.
    h-screen sınıfı, <div> öğesini ekranın tamamını kaplayacak şekilde yüksekliğini ayarlar.
  */}
    <input
        type="text"
        className="border border-black rounded px-6 py-2 mb-4"
        placeholder="Metin giriniz..."
        onChange={handleInputChange}
      />
      {/* 
      1- bir giriş alanı (<input>) oluşturur.
      className özelliği, içinde bulunan sınıfları belirtir.
      placeholder özelliği, giriş alanına varsayılan bir içerik yerleştirir.
      onChange özelliği, giriş alanına girilen metni işlemek için bir olay dinleyicisidir.
    */}
      <div className="text-lg">{text}</div>
      {/* 
     1- bir başka <div> öğesi tanımlar.
    className özelliği, içinde bulunan sınıfları belirtir.
    text-lg sınıfı, içeriğin metin boyutunu büyütür.
    {text} ifadesi, bileşenin durumundaki metni görüntüler.
  */}
    </div>
  );
};

export default App;
