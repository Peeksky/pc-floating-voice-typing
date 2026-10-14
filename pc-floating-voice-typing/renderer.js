const lang = document.getElementById('lang'), startBtn = document.getElementById('start'), stopBtn = document.getElementById('stop'), status = document.getElementById('status');
let rec = null, listening = false, restart = false, lastFinal = '', interim = '';
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
function setStatus(t){status.textContent=t;}
function makeRecognition(){
  if (!SpeechRec) { setStatus('Speech recognition unavailable in this runtime. Try the latest Chrome/Edge-based build.'); return null; }
  const r = new SpeechRec(); r.continuous = true; r.interimResults = true; r.maxAlternatives = 1; r.lang = lang.value === 'hinglish' ? 'hi-IN' : lang.value;
  r.onresult = e => {
    let finals = '';
    for (let i=e.resultIndex;i<e.results.length;i++) {
      const phrase = e.results[i][0].transcript;
      if (e.results[i].isFinal) finals += phrase;
      else interim = phrase;
    }
    if (finals.trim()) {
      const text = finals.trim();
      window.desktopVoice.pasteText(text + ' ');
      setStatus('Typed: ' + text.slice(0,55)); interim='';
    } else if (interim) setStatus('Listening… ' + interim.slice(0,50));
  };
  r.onerror = e => setStatus(({ 'not-allowed':'Microphone blocked: allow microphone access for this app.', 'service-not-allowed':'Speech service unavailable.', 'network':'Network error: speech recognition needs internet.', 'no-speech':'No speech detected; keep speaking.' })[e.error] || ('Recognition: '+e.error));
  r.onend = () => { if (listening) { setTimeout(()=>{ if(listening) { try { rec = makeRecognition(); if(rec) rec.start(); } catch(_){} } }, 250); } else setStatus('Stopped. Ctrl+Shift+Space to start.'); };
  return r;
}
function start(){ if(listening) return; if(!SpeechRec){setStatus('Speech recognition not supported.');return;} listening=true; startBtn.textContent='● Listening'; startBtn.disabled=true; setStatus('Starting microphone…'); rec=makeRecognition(); try{rec.start();setStatus('Listening… speak naturally.');}catch(e){listening=false;startBtn.disabled=false;startBtn.textContent='● Start';setStatus('Could not start: '+e.message);} }
function stop(){listening=false;startBtn.disabled=false;startBtn.textContent='● Start';if(rec){try{rec.onend=null;rec.stop();}catch(_){}}rec=null;setStatus('Stopped.');}
function toggle(){listening?stop():start();}
startBtn.addEventListener('click',start);stopBtn.addEventListener('click',stop);document.getElementById('hide').addEventListener('click',()=>{stop();window.desktopVoice.hidePanel();});lang.addEventListener('change',()=>{if(listening){stop();start();}});
window.desktopVoice.onHotkeyToggle(()=>toggle());window.desktopVoice.onHotkeyStop(()=>stop());
