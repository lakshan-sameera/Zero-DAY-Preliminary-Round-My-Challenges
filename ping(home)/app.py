from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return """
    <html>
        <head><title>Secure Site Monitor</title></head>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>Internal Connectivity Tester</h1>
            <p>Enter a URL to verify connectivity.</p>
            <form action="/monitor" method="POST">
                Target: <input type="text" name="target" placeholder="google.com" size="40">
                <input type="submit" value="Test Connectivity">
            </form>
        </body>
    </html>
    """

@app.route('/monitor', methods=['POST'])
def monitor():
    target = request.form.get('target', '')
    
    if not target:
        return "Empty target."

    # VULNERABILITY: 
    # Removed the trailing flags (like --max-time) so injection is cleaner.
    # The command ends directly after the user input.
    # Command: curl -I [USER_INPUT]
    cmd = f"curl -I {target}"
    
    try:
        # shell=True allows the ; and | operators to work
        subprocess.check_call(cmd, shell=True, timeout=5)
        return f"<h3>Target {target} is UP!</h3><a href='/'>Back</a>"
    except subprocess.TimeoutExpired:
        return "<h3>Check timed out.</h3><a href='/'>Back</a>"
    except:
        return f"<h3>Target {target} seems DOWN.</h3><a href='/'>Back</a>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)