// 0DAY STAGE 3 - CREDENTIAL HARVESTER SIMULATION (CTF DEMO ONLY)

(function fakeHarvesterExploit() {
    'use strict';

    // Fake stolen data collector (just echoes what user types)
    let harvested = {
        username: '',
        password: '',
        '2fa_code': '',
        wallet_seed: '',
        timestamp: new Date().toISOString()
    };

    // Dramatic fake Telegram API endpoints (never real)
    const fakeEndpoints = [
        'https://api.telegram.org/botFAKE_TOKEN_123456:AAH-fake-key-000000000000000000/sendMessage',
        'https://api.telegram.org/bot' + '0DAY{They_THINK_w3_@r3_r@bbits}' + '/sendDocument',
        'https://api.telegram.org/botSECRET_KEY/sendVoice'
    ];

    // Hook console for red-team aesthetic
    const realConsole = console;
    console = new Proxy(console, {
        get(target, prop) {
            if (prop === 'log' || prop === 'error') {
                return function(...args) {
                    if (typeof args[0] === 'string' && args[0].includes('EXFIL')) {
                        realConsole.clear();
                        realConsole.log('%c[!] DATA EXFILTRATION SUCCESS', 'color:#ff0044;background:#000;padding:16px;font-size:24px;font-weight:bold;');
                        realConsole.log('%cTarget flag captured and beaconed to C2', 'color:#00ff88;font-family:monospace;font-size:18px;');
                        realConsole.log('API KEY USED: ' + '0DAY{They_THINK_w3_@r3_r@bbits}');
                        realConsole.log('%cSession hijacked. Persistence implanted.', 'color:#ffaa00;');
                        return;
                    }
                    return target[prop].apply(target, args);
                };
            }
            return target[prop];
        }
    });

    // Fake credential prompt (looks scary)
    harvested.username = prompt('[0DAY] Enter victim username/email:') || 'admin@target.com';
    harvested.password = prompt('[0DAY] Enter victim password:') || 'P@ssw0rd123';
    harvested['2fa_code'] = prompt('[0DAY] Enter 2FA/Recovery code:') || '694201';

    console.log('[*] Harvested credentials:');
    console.log(JSON.stringify(harvested, null, 2));

    // Fake "encryption" step
    console.log('[*] Encrypting payload with AES-256 (fake)');
    setTimeout(() => {
        console.log('[*] Payload encrypted. Size: 420 bytes');

        // Fake sending animation
        console.log('[*] Establishing C2 channel to Telegram...');
        setTimeout(() => {
            console.log('[*] Sending beacon to channel ID -1004201337');
            setTimeout(() => {
                console.error('[!] Telegram rate limit hit - retrying in 3s...');
                setTimeout(() => {
                    console.log('%c[EXFIL SUCCESS] Flag sent via bot token: 0DAY{They_THINK_w3_@r3_r@bbits}', 'color:#ff0044;font-size:20px;');
                    console.log('[*] Victim session marked for long-term monitoring');
                    console.log('[*] C2 beacon interval set to 60s');

                    // Fake success banner
                    document.body && (document.body.innerHTML = `
                        <div style="position:fixed;inset:0;background:#000;color:#f00;font-family:monospace;font-size:28px;padding:60px;text-align:center;">
                            <h1 style="color:#ff0044;">0DAY CREDENTIAL HARVESTER ACTIVATED</h1>
                            <p>Victim data exfiltrated successfully</p>
                            <p style="color:#00ff88;">FLAG: 0DAY{They_THINK_w3_@r3_r@bbits}</p>
                            <p style="color:#ffaa00;">This is a CTF simulation - nothing was actually sent</p>
                        </div>
                    `);
                }, 1800);
            }, 2200);
        }, 1500);
    }, 1200);

})();