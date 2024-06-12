import React from "react";
import "../styles/presentation.css";

const QuiSommesNous = () => {
  return (
    <div className="quiSommesNous_container">
      <h1>Qui sommes-nous</h1>
      <div className="quiSommesNous_content">
        <p>
          "Semer l’Avenir" est une association fondée en accord avec la loi du
          1er juillet 1901 et le décret du 16 août 1901, ainsi que la loi
          n°2014‐856 du 31 juillet 2014 relative à l’économie sociale et
          solidaire.
        </p>
        <p>
          Notre objectif est d'accompagner la résilience d'un territoire à
          travers l'émergence d'initiatives locales, écologiques, sociales et
          solidaires. Nous promouvons les pratiques respectueuses de la nature
          et de l'humain, en sensibilisant, accompagnant et formant aux métiers
          de la transition écologique.
        </p>
        <p>
          Nous coopérons activement avec tous les acteurs du territoire pour
          contribuer au développement humain dans la cité. Notre action vise à
          créer de nouveaux imaginaires et récits pour semer les graines d'une
          transformation sociétale, promouvoir les initiatives éco-citoyennes,
          et créer des espaces ouverts dans le respect de chacun.
        </p>
        <p>
          Nos membres, qu'ils soient d'honneur, bienfaiteurs ou actifs, ont tous
          une voix égale dans nos processus de décision. Nous nous engageons à
          respecter nos valeurs fondamentales, telles que l'éducation à la
          citoyenneté et à l'environnement, et à promouvoir la culture dans
          toutes nos actions.
        </p>
        <p>
          Le siège social de notre association est situé à Créative Factory, 32
          Boulevard de la Muette 95140, Garges-lès-Gonesse. Pour plus
          d'informations sur nos activités et nos actions, n'hésitez pas à nous
          contacter.
        </p>
      </div><br></br>
      <div className="imageGrid">
        <div className="imageContainer">
          <img src="src/assets/ogimage.png" alt="Sans traitement" />
          <p>Activité 1 (Sans traitement)</p>
        </div>
        <div className="imageContainer greenMedium">
          <img src="src/assets/ogimage.png" alt="Vert Moyen - Transparence 10 à 50%" />
          <p>Activité 2 (Vert Moyen - Transparence 10 à 50%)</p>
        </div>
        <div className="imageContainer whiteOff">
          <img src="src/assets/ogimage.png" alt="Blanc Cassé - transparence 10 à 50%" />
          <p>Activité 3 (Blanc Cassé - transparence 10 à 50%)</p>
        </div>
        <div className="imageContainer greenDark">
          <img src="src/assets/ogimage.png" alt="Vert Foncé - transparence 10 à 50%" />
          <p>Activité 4 (Vert Foncé - transparence 10 à 50%)</p>
        </div>
      </div><br></br>
      <h1 class="imageRowTitle"><b>Présentation de nos activités</b></h1>
      <div className="imageRow">
        <div className="imageCircle">
          <a href="/nos-actualites">
            <img src="src/assets/ogimage.png" alt="Nos actualités" />
            <p>Nos actualités</p>
          </a>
        </div>
        <div className="imageCircle">
          <a href="/nos-formations">
            <img src="src/assets/ogimage.png" alt="Nos formations" />
            <p>Nos formations</p>
          </a>
        </div>
        <div className="imageCircle">
          <a href="/contact">
            <img src="src/assets/ogimage.png" alt="Contact" />
            <p>Contact</p>
          </a>
        </div>
      </div><br></br>
    </div>
  );
};

export default QuiSommesNous;
