import React from "react";
import '../styles/accueil.css';

const HomePages = () => {
  return (
    <>
      <div className="homePage">
        <div className="homePage_content">
          <div className="homePage_content_left">
            <h2>Présentation</h2>
            <p>
              L’association se donne pour mission, toujours dans un esprit écologique, social et solidaire :
              <ul>
                <li>D’accompagner la création de nouveaux imaginaires et récits afin de semer les graines d’une transformation sociétale</li>
                <li>De promouvoir les démarches et initiatives éco-citoyennes</li>
                <li>De faire avec, de faire en pratiquant et en participant avec les acteurs et actrices d’un territoire</li>
                <li>De créer des espaces physiques ouverts de manière inconditionnelle dans le respect des spécificités de chaque personne.</li>
              </ul>
              Pour atteindre ses objectifs, l'association utilisera l’ensemble des moyens disponibles tant que ces derniers sont respectueux du triptyque écologie, social, solidarité. Les moyens de la formation professionnelle, la vente de prestations ainsi que l'accompagnement et l'expertise feront partie des possibilités pour parvenir à remplir ses objectifs.
            </p>
            <h2>Nos partenaires</h2>
          </div>
          <div className="homePage_content_right">
            <div className="img-carousel">
              <img src="https://www.lespetitsdebrouillardsgrandest.org/wp-content/uploads/2020/09/IMG_20200909_103646.jpg" alt="carousel" />
              <img src="https://www.lespetitsdebrouillardsgrandest.org/wp-content/uploads/2020/09/IMG_20200909_103646.jpg" alt="carousel" />
              <img src="https://www.lespetitsdebrouillardsgrandest.org/wp-content/uploads/2020/09/IMG_20200909_103646.jpg" alt="carousel" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default HomePages;
