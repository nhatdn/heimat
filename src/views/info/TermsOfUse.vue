<template>
  <div class="info">
    <div class="header">
      <div class="list">
        <ul>
          <li><router-link :to="{ name: 'Home' }">Home Page</router-link></li>
          <li><router-link :to="{ name: 'About' }">About Us</router-link></li>
          <li><router-link :to="{ name: 'Home' }">Contact</router-link></li>
        </ul>
      </div>
      <div class="logo">
        <router-link :to="{ name: 'Home' }"
          ><span class="logo">Heimat</span></router-link
        >
      </div>
      <p class="content-header">
        TERMS OF USE FOR HEIMAT <br />
        SOCIAL NETWORK USERS
      </p>
      <div class="btn">
        <input type="button" value="Learn more" />
      </div>
    </div>
    <div class="content">
      <div class="content1">
        <div class="heading">
          <h2>
            1. CONTENTS OF THE AGREEMENT ON PROVISION AND USE <br />
            OF HEIMAT SOCIAL NETWORKING SERVICES
          </h2>
        </div>
        <div class="contents-1">
          <p>
            Heimat prohibits users from sharing, posting, discussing or engaging
            in any conduct for the purpose of:
          </p>
          <p>
            Against the State of the Socialist Republic of Vietnam; infringing
            upon national security, social order and safety; undermining the
            great unity block of the whole people; propagate wars of aggression
            and terrorism; causing hatred and conflict among peoples,
            ethnicities, races, religions
          </p>
          <p>
            Propaganda, incitement to violence, lewdness, debauchery, crimes,
            social evils, superstition, destruction of the nation's fine customs
            and traditions Absolutely do not discuss, share content on issues
            unrelated to website content, against the law and social ethics.
          </p>
          <ul>
            <li>
              - Users take advantage of Heimat to disclose state secrets,
              military secrets, security, culture, economy, foreign affairs and
              other secrets as prescribed by law in any form. on Spiderum;
            </li>
            <li>
              - Advertising, propagating, trading in banned goods and services,
              disseminating journalistic, literary and artistic works, and
              banned publications on websites;
            </li>
            <li>
              - Performing commercial acts on the website without the consent of
              Heimat
            </li>
            <li>
              - When communicating with other users, users harass, curse,
              disturb or have any behavior that infringes upon the interests,
              confidentiality of information, private space of other users, as
              well as infringes upon Heimat
            </li>
            <li>
              - Users have the right to use their own images. When using the
              image of another individual, the user must obtain the consent of
              that individual. It is strictly forbidden to use other people's
              images to infringe on the honor, dignity and reputation of the
              person having the image, to use it for other purposes without the
              consent of the person having the image.
            </li>
            <li>
              - Taking advantage of the Heimat social network to collect user
              information, post information and documents about other users'
              private lives
            </li>
            <li>
              - Disseminating information that distorts, slanders, ridicules or
              damages the reputation of organizations and individuals in any
              form (joke, disparagement, discrimination against religion,
              gender, ethnicity, etc.)
            </li>
          </ul>
        </div>
      </div>
      <div class="content2">
        <div class="heading">
          <h2>
            2. RIGHTS AND RESPONSIBILITIES OF USERS OF SOCIAL <br />
            NETWORKING SERVICES ON HEIMAT
          </h2>
        </div>
        <div class="contents-2">
          <ul>
            <li>
              - Use social networking services according to the quality and
              contents of the agreement
            </li>
            <li>
              - Compensation for direct damage caused by their own fault to the
              social network enterprise if causing damage
            </li>
            <li>
              - Take responsibility before the law for the content of
              information transmitted, put, and stored on social networks
            </li>
            <li>
              - Do not use the social network of a social network enterprise for
              business in any form without the consent of the enterprise
              providing the social network service.
            </li>
            <li>
              - Comply with the operating time of the public Internet access
              point, the rules, regulations and operating time of the social
              network
            </li>
            <li>- Do not re-sell Internet services in any form.</li>
            <li>
              - Comply with regulations on information safety, information
              security and other relevant regulations in accordance with the law
              and the agreement on provision and use of social networking
              services
            </li>
            <li>
              - Comply with regulations on management, provision and use of
              social networking services.
            </li>
            <li>
              - Be responsible for the content of information stored, provided,
              transmitted on social networks by you, or disseminated through the
              direct link you set up.
            </li>
          </ul>
        </div>
      </div>
      <div class="content3">
        <div class="heading">
          <h2>
            3. MECHANISMS FOR HANDLING MEMBERS WHO VIOLATE <br />
            THE AGREEMENT ON PROVISION AND USE OF SOCIAL <br />
            NETWORKING SERVICES:
          </h2>
        </div>
        <div class="contents-3">
          <p>
            Users of the scope of the agreement to provide and use social
            networks, according to the severity of the scope will be dealt with
            accordingly;
          </p>
          <p>
            Reminder and warning: Compare with Spiderum's scope format in terms
            of format, position, and topic of the article; Spam content,
            advertising content, content that affects the reputation of other
            individuals or organizations or has other customer behavior within
            the scope of Spiderum's rights and interests: The Management Board
            has the right to delete, move categories, filter out advertising
            content, replace inappropriate words, suspend display to wait for
            censorship according to extent. At the same time, that Member will
            be reminded, warned (first time) or temporarily locked account (07
            days) or permanently locked account (third time);
          </p>
          <p>
            Temporarily locking the account: The administrator ensures that new
            posts are checked, hidden inappropriate posts or temporarily locked.
            Members spam advertising news, aiming to ensure the quality of the
            forum and to not influence the activities of other members;
          </p>
          <p>
            Permanently Block: Fight against violations of the law on content
            that is prohibited from posting, sharing and exchanging on social
            networks: Spiderum The Administration has the right to immediately
            block and delete posts without a message. At the same time, that
            Member will be reminded, warned (first time) or applied the form of
            suspended account lock (07 days or 15 days) or permanently locked
            account (second violation or third time);
          </p>
          <ul>
            <li>- In case the management contract violates the scope.</li>
            <li>
              - The form of handling locked accounts with a term or forever;
            </li>
            <li>- Handling configuration formula:</li>
          </ul>
          <p>
            Processing form 1: 7 days account key <br />
            Processing form 2 15 days account key <br />
            Method of handling 3: permanent account.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Info",
};
</script>

<style lang="scss" scoped>
.info {
  .header {
    background: url("../../assets/images/about.png");
    background-size: cover;
    background-position: center;
    height: 100vh;
    background-attachment: fixed;
  }
  .list {
    margin-left: 100rem;
  }
  .list ul li {
    list-style: none;
    display: inline-block;
    padding: 1rem;
    padding-top: 3rem;
  }

  a {
    text-decoration: none;
    color: #ffffff;
    font-size: 1.7rem;
    font-family: $font-primary;
  }
  .logo {
    font-family: $font-primary;
    font-style: normal;
    font-size: 7.2rem;
    line-height: 8.7rem;
    letter-spacing: 0.29em;
    color: #ffffff;
    margin-top: 12.5rem;
    text-align: center;
    text-transform: uppercase;
  }

  .content-header {
    color: #ffffff;
    font-family: $font-primary;
    font-style: normal;
    font-weight: 400;
    font-size: 3.6rem;
    line-height: 4.2rem;
    text-align: center;
    letter-spacing: 0.29em;
    margin-top: 1rem;
  }

  .btn {
    text-align: center;
    margin-top: 2rem;
  }
  .btn input {
    padding: 1rem 2.5rem;
    border-radius: 10rem;
    background: rgba(#ffddff, 0.13);
    border: none;
    color: #ffffff;
    font-family: $font-primary;
    font-style: normal;
    font-size: 2rem;
    line-height: 2.3rem;
    text-align: center;
    letter-spacing: 0.29em;
    cursor: pointer;
    @include transition(background 0.3s ease);
  }
  .btn input:hover,
  .btn input:active {
    background: rgba(#ffddff, 0.22);
  }
  .content {
    margin-top: 3rem;
    max-width: 97.7rem;
    margin-left: 15%;
  }
  .heading {
    text-align: center;
    font-family: $font-primary;
    font-style: normal;
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 2.3rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.64);
    padding: 1.5rem;
  }
  .contents-1 {
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.62);
    & p {
      padding: 1rem;
      font-weight: 400;
      text-align: justify;
      font-family: $font-primary;
    }
    & li {
      list-style: none;
      padding: 1rem;
      color: color rgba(0, 0, 0, 0.62);
    }
  }
  .contents-2 {
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.69);
    & p {
      padding: 1rem;
      font-weight: 400;
      text-align: justify;
      font-family: $font-primary;
    }
    & li {
      list-style: none;
      padding: 1rem;
      color: color rgba(0, 0, 0, 0.69);
    }
  }
  .contents-3 {
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.58);
    & p {
      padding: 1rem;
      font-weight: 400;
      text-align: justify;
      font-family: $font-primary;
    }
    & li {
      list-style: none;
      padding: 1rem;
      color: color rgba(0, 0, 0, 0.58);
    }
  }
}
</style>