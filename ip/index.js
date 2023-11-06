//axios import buraya gelecek
import axios from "axios";

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

// --- Değiştirmeyin ---

async function getIPInfo() {
  try {
    const response = await axios.get("https://apis.ergineer.com/ipadresim");
    const myIP = response.data;
    const apiUrl = `https://apis.ergineer.com/ipgeoapi/${myIP}`;
    const apiResponse = await axios.get(apiUrl);
    const data = apiResponse.data;
    createIPInfoCard(data);
  } catch (error) {
    console.error("API sorgusu başarısız: " + error);
  }
}

function createIPInfoCard(data) {
  var cardContainer = document.querySelector(".cards");

  var card = document.createElement("div");
  card.className = "card";

  var img = document.createElement("img");
  img.src = data.ülkebayrağı;

  var cardInfo = document.createElement("div");
  cardInfo.className = "card-info";

  var ipAddress = document.createElement("h3");
  ipAddress.className = "ip";
  ipAddress.textContent = data.sorgu;

  var countryInfo = document.createElement("p");
  countryInfo.className = "ulke";
  countryInfo.textContent = `${data.ülke} (${data.ülkeKodu})`;

  var coordinates = document.createElement("p");
  coordinates.textContent = `Enlem: ${data.enlem} Boylam: ${data.boylam}`;

  var city = document.createElement("p");
  city.textContent = `Şehir: ${data.bölgeAdı}`;

  var timeZone = document.createElement("p");
  timeZone.textContent = `Saat Dilimi: ${data.saatdilimi}`;

  var currency = document.createElement("p");
  currency.textContent = `Para Birimi: ${data.parabirimi}`;

  var isp = document.createElement("p");
  isp.textContent = `ISP: ${data.isp}`;

  cardInfo.appendChild(ipAddress);
  cardInfo.appendChild(countryInfo);
  cardInfo.appendChild(coordinates);
  cardInfo.appendChild(city);
  cardInfo.appendChild(timeZone);
  cardInfo.appendChild(currency);
  cardInfo.appendChild(isp);

  card.appendChild(img);
  card.appendChild(cardInfo);

  cardContainer.appendChild(card);
}

ipAdresimiAl();
getIPInfo();
