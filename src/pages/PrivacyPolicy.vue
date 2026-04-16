<template>
  <section class="legal-page">
    <button class="back-button" type="button" @click="goBack">Voltar</button>

    <article class="content" aria-labelledby="privacy-title">
      <h1 id="privacy-title">Política de Privacidade</h1>

      <p>
        A sua privacidade é importante para nós. É política do ibpsys respeitar a sua privacidade em relação a
        qualquer informação sua que possamos coletar aqui.
      </p>
      <p>
        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.
        Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos
        coletando e como será usado.
      </p>
      <p>
        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando
        armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como
        acesso, divulgação, cópia, uso ou modificação não autorizados.
      </p>
      <p>
        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido
        por lei. Lembre-se: a ibpsys é apenas a custodiante destes dados, o proprietário é <strong>você</strong>.
      </p>
      <p>
        O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos
        controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas
        políticas de privacidade.
      </p>
      <p>
        Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos
        fornecer alguns dos serviços desejados.
      </p>
      <p>
        O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e
        informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações
        pessoais, entre em contato conosco.
      </p>

      <ul>
        <li>
          O serviço Google AdSense que usamos para veicular publicidade direcionada em páginas específicas usa um cookie
          DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado 
          anúncio é exibido.
        </li>
        <li>
          Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
        </li>
        <li>
          Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros
          desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados para garantir
          que você receba anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e
          apresentando conteúdos semelhantes que possam ser do seu interesse.
        </li>
        <li>
          Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem
          ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos
          creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam promoções
          relacionadas à compra.
        </li>
      </ul>

      <h2>Compromisso do Usuário</h2>
      <p>
        O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o ibpsys oferece no site e,
        com caráter enunciativo, mas não limitativo:
      </p>
      <ul>
        <li>a) Não se envolver em atividades que sejam ilegais ou contrárias à boa-fé e à ordem pública.</li>
        <li>b) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer
          tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos.
        </li>
        <li>c) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do ibpsys, de seus fornecedores
          ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou
          software capazes de causar danos anteriormente mencionados.
        </li>
      </ul>

      <h2>Mais informações</h2>
      <p>
        Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se
        precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que
        você usa em nosso site.
      </p>
      <p class="effective-date">Esta política é efetiva a partir de sua data de publicação, em 13 de abril de 2026.</p>
    </article>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

const router = useRouter()

function goBack() {
  router.back()
}

useHead({
  title: 'Política de Privacidade - ibpsys',
  meta: [
    { name: 'description', content: 'Leia a política de privacidade da ibpsys, garantindo a proteção de seus dados e informações pessoais.' },
    { property: 'og:title', content: 'Política de Privacidade - ibpsys' },
    { property: 'og:description', content: 'Leia a política de privacidade da ibpsys, garantindo a proteção de seus dados e informações pessoais.' },
    { name: 'keywords', content: 'ibpsys, privacidade, política de privacidade, proteção de dados, segurança, informações pessoais' }
  ]
})
</script>

<style scoped>
.legal-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
}

.back-button {
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #fff;
  color: #1f2937;
  padding: 0.55rem 0.9rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.back-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.content {
  margin-top: 1.2rem;
  color: #444;
  line-height: 1.75;
}

.content h1 {
  margin: 0 0 1.25rem;
  color: #1f2937;
  font-size: clamp(1.6rem, 2.4vw, 2rem);
  line-height: 1.2;
}

.content h2 {
  margin: 2rem 0 0.8rem;
  color: #1f2937;
  font-size: 1.2rem;
}

.content p {
  margin: 0 0 1rem;
}

.content ul {
  margin: 0 0 1.2rem;
  padding-left: 1.2rem;
}

.content li {
  margin-bottom: 0.7rem;
}

.content a {
  color: #0f5ca8;
  text-decoration: underline;
}

.effective-date {
  margin-top: 1.4rem;
  font-size: 0.92rem;
  color: #6b7280;
}
</style>
