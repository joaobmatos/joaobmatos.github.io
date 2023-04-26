const form = document.querySelector('.contact__form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const name = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('projeto').value;

  const subject = `Novo contato de ${name}`;
  const body = `
    Nome: ${name}
    E-mail: ${email}
    Mensagem: ${message}
  `;

  const apiKey = 'YOUR_API_KEY_HERE';
  const toEmail = 'joao.b_matos@outlook.com.br';
  const url = `https://api.sendgrid.com/v3/mail/send`;

  const headers = new Headers({
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  });

  const data = {
    personalizations: [
      {
        to: [{email: toEmail}]
      }
    ],
    from: {email: email},
    subject: subject,
    content: [
      {
        type: 'text/plain',
        value: body
      }
    ]
  };

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  };

  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Não foi possível enviar a mensagem.');
      }
      alert('Mensagem enviada com sucesso!');
      form.reset();
    })
    .catch(error => {
      console.error(error);
      alert('Ocorreu um erro ao enviar a mensagem.');
    });
});
