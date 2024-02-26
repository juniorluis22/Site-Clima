document.addEventListener("DOMContentLoaded", ()=> {

    document.querySelector('.busca').addEventListener('submit', async (event)=>{
        event.preventDefault()
    
        let input = document.querySelector('#searchInput').value
            if(input !== ''){
               limparTela()
               aviso('Carregando...')
               let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e39ce2a5a66fa573b9c6c2d3c4eca5e8&units=metric&lang=pt_br`
    
               let resultado = await fetch(url)
               let json = await resultado.json()
    
               if(json.cod === 200){
                informcaoDaTela({
                    nome:json.name,
                    pais:json.sys.country,
                    tempo:json.main.temp,
                    tempoIcone:json.weather[0].icon,
                    vento:json.wind.speed,
                    anguloVento:json.wind.deg
                })
    
               }else {
                limparTela()
                aviso('Não encontramos esta localização.')
               }
            } else{
                limparTela()
            }  
    })
    
    

    function informcaoDaTela(json){
        aviso('')
        
        document.querySelector('.resultado').style.display = 'block'
        document.querySelector('.titulo').innerHTML = `${json.nome}, ${json.pais} `
        document.querySelector('.tempInfo').innerHTML = `${json.tempo.toFixed(0)} <sup>ºC</sup>`
        document.querySelector('.ventoInfo').innerHTML = `${json.vento.toFixed(1)} <span>km/h</span>`
        
        document.querySelector('.ventoPonto').style.transform  = `rotate(${json.anguloVento-90}deg) `
    
        document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempoIcone}@2x.png`)
    
    
        let body = document.querySelector('body')
        body.classList.remove('neve', 'frio', 'normal', 'sol', 'quente');
    
        if(json.tempo <= 0 ){
            body.classList.add('neve')
    
        } else if (json.tempo < 20 ){
            body.classList.add('frio');
        
        } else if (json.tempo < 25){
            body.classList.add('normal')
    
        } else if (json.tempo < 33 ){
            body.classList.add('sol')
    
        } else{
            body.classList.add('quente')
    
        }
       
    }
    
    function aviso(msg){
        document.querySelector('.aviso').innerHTML= msg
    }
    
    function limparTela(){
        aviso('')
        document.querySelector('.resultado').style.display = 'none'
    
    }
    
});


