import { Flex, Tooltip } from "@chakra-ui/react";
import React from "react";

const StarIcon = () => (
  <svg
    data-name="activeStar"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 58 58"
  >
    <g id="Polygon_2" data-name="Polygon 2" fill="#ffc600">
      <path
        d="M 41.7806510925293 54.21798706054688 C 41.20904922485352 54.21799850463867 40.65338134765625 54.07565689086914 40.12908935546875 53.79490661621094 L 31.12424087524414 48.97309494018555 C 30.47312927246094 48.62444686889648 29.73858070373535 48.44016647338867 29 48.44016647338867 C 28.26141929626465 48.44016647338867 27.52687072753906 48.62444686889648 26.87575912475586 48.97308731079102 L 17.87091064453125 53.79489517211914 C 17.34663009643555 54.07563781738281 16.79096031188965 54.21798706054688 16.21933937072754 54.21798706054688 C 15.20100975036621 54.21798706054688 14.22838020324707 53.76655578613281 13.55082035064697 52.97945785522461 C 12.88498973846436 52.20597839355469 12.60330963134766 51.21489715576172 12.75767040252686 50.18877792358398 L 14.42280960083008 39.11944580078125 C 14.63078022003174 37.73691558837891 14.19758987426758 36.36283493041992 13.234299659729 35.34954833984375 L 5.554780006408691 27.27142715454102 C 4.646729946136475 26.31624603271484 4.35414981842041 24.99978637695312 4.772130012512207 23.74989700317383 C 5.190110206604004 22.50000762939453 6.215750217437744 21.62438583374023 7.515719890594482 21.40760612487793 L 17.90790939331055 19.67458724975586 C 19.34449005126953 19.43502616882324 20.58148956298828 18.50960731506348 21.21689033508301 17.19907760620117 L 25.85063934326172 7.641776561737061 C 26.44960403442383 6.406382083892822 27.62705039978027 5.668716907501221 28.99997138977051 5.668716907501221 C 29.00005531311035 5.668716907501221 28.99991607666016 5.668716907501221 29 5.668716907501221 C 30.37302017211914 5.668706893920898 31.55035018920898 6.406306743621826 32.14936065673828 7.641776561737061 L 36.78311157226562 17.19907760620117 C 37.41849899291992 18.50959587097168 38.65549850463867 19.43501663208008 40.09207916259766 19.67458724975586 L 50.48426818847656 21.40760612487793 C 51.78424835205078 21.62438583374023 52.80989074707031 22.50000762939453 53.22787094116211 23.74989700317383 C 53.64585876464844 24.99978637695312 53.353271484375 26.31624603271484 52.44522094726562 27.27142715454102 L 44.76570129394531 35.34954833984375 C 43.80241012573242 36.36283493041992 43.36922073364258 37.73691558837891 43.57719039916992 39.11944580078125 L 45.2423210144043 50.18877792358398 C 45.39665985107422 51.21477508544922 45.11497116088867 52.20580673217773 44.44911956787109 52.97932815551758 C 43.77151870727539 53.76649856567383 42.79890060424805 54.21796798706055 41.7806510925293 54.21798706054688 Z"
        stroke="none"
      />
      <path
        d="M 29 6.168704986572266 C 27.8231201171875 6.168704986572266 26.81398010253906 6.800926208496094 26.30055046081543 7.859905242919922 L 21.66680145263672 17.41721725463867 C 20.96080017089844 18.87335586547852 19.58634948730469 19.90159606933594 17.99015045166016 20.16777801513672 L 7.597969055175781 21.90079498291016 C 6.483711242675781 22.08660507202148 5.604579925537109 22.83713531494141 5.246311187744141 23.90846633911133 C 4.888038635253906 24.97980499267578 5.138828277587891 26.10819625854492 5.917160034179688 26.92692565917969 L 13.5966796875 35.00504684448242 C 14.66698837280273 36.13089752197266 15.14831924438477 37.65764617919922 14.91724014282227 39.19381713867188 L 13.25210189819336 50.26313781738281 C 13.1197509765625 51.14302825927734 13.36040878295898 51.99185562133789 13.92977142333984 52.65326690673828 C 14.50366973876953 53.3199577331543 15.35958862304688 53.71798706054688 16.21934127807617 53.71798706054688 C 16.70772933959961 53.71798706054688 17.18397903442383 53.59556579589844 17.63489151000977 53.35411834716797 L 26.63973999023438 48.53230667114258 C 27.36318969726562 48.14491653442383 28.17935943603516 47.94015502929688 29 47.94015502929688 C 29.82062911987305 47.94015502929688 30.63680076599121 48.14491653442383 31.36026000976562 48.53230667114258 L 40.36511993408203 53.35411834716797 C 40.81600952148438 53.59556579589844 41.29227066040039 53.71798706054688 41.78066253662109 53.71798706054688 C 42.64031219482422 53.71798706054688 43.49620056152344 53.31992721557617 44.07015228271484 52.65317535400391 C 44.63954162597656 51.99172592163086 44.88022994995117 51.14292526245117 44.74789047241211 50.26313781738281 L 43.08275985717773 39.19382476806641 C 42.85166931152344 37.65766906738281 43.33298873901367 36.13091659545898 44.4033088684082 35.00504684448242 L 52.08283996582031 26.92692565917969 C 52.86116790771484 26.10819625854492 53.1119499206543 24.97980499267578 52.75368118286133 23.90847778320312 C 52.39542007446289 22.83713531494141 51.51628875732422 22.08660507202148 50.40203094482422 21.90078735351562 L 40.00984191894531 20.16777801513672 C 38.41365051269531 19.90159606933594 37.03919982910156 18.87335586547852 36.33319854736328 17.41721725463867 L 31.69944953918457 7.859905242919922 C 31.18601989746094 6.800926208496094 30.1768798828125 6.168704986572266 29 6.168704986572266 M 28.99999618530273 5.168708801269531 C 30.43520545959473 5.168708801269531 31.87041473388672 5.920352935791016 32.59926986694336 7.423637390136719 L 37.2330207824707 16.9809455871582 C 37.79878997802734 18.14785766601562 38.89516067504883 18.96808624267578 40.17433166503906 19.181396484375 L 50.56652069091797 20.91440582275391 C 53.73006057739258 21.44196701049805 55.01739120483398 25.29144668579102 52.80760192871094 27.61592483520508 L 45.12807083129883 35.69404602050781 C 44.27793121337891 36.58831787109375 43.88808059692383 37.82489776611328 44.07162857055664 39.04506683349609 L 45.73675918579102 50.11438751220703 C 46.22637939453125 53.36920547485352 42.79468154907227 55.7894287109375 39.89305877685547 54.23568725585938 L 30.88821029663086 49.41387557983398 C 29.70864105224609 48.78225708007812 28.29135894775391 48.78225708007812 27.11178970336914 49.41387557983398 L 18.10694122314453 54.23568725585938 C 15.20531463623047 55.7894287109375 11.77361679077148 53.36920547485352 12.26322937011719 50.11438751220703 L 13.92837142944336 39.04506683349609 C 14.11191177368164 37.82489776611328 13.72206878662109 36.58831787109375 12.87192153930664 35.69404602050781 L 5.192401885986328 27.61592483520508 C 2.982608795166016 25.29144668579102 4.269931793212891 21.44196701049805 7.433479309082031 20.9144172668457 L 17.82566070556641 19.181396484375 C 19.10483932495117 18.96808624267578 20.20121002197266 18.14786529541016 20.7669792175293 16.9809455871582 L 25.40073013305664 7.423637390136719 C 26.12957954406738 5.920352935791016 27.56478691101074 5.168708801269531 28.99999618530273 5.168708801269531 Z"
        stroke="none"
        fill="#000"
      />
    </g>
    <path
      id="Polygon_7"
      data-name="Polygon 7"
      d="M13.2,3.712a2,2,0,0,1,3.6,0l2.474,5.1a2,2,0,0,0,1.471,1.1l5.539.924A2,2,0,0,1,27.4,14.19l-4.085,4.3a2,2,0,0,0-.528,1.676l.887,5.895a2,2,0,0,1-2.922,2.061l-4.811-2.576a2,2,0,0,0-1.888,0L9.244,28.118a2,2,0,0,1-2.922-2.061l.887-5.895a2,2,0,0,0-.528-1.676L2.6,14.19a2,2,0,0,1,1.121-3.351l5.539-.924a2,2,0,0,0,1.471-1.1Z"
      transform="translate(14 14)"
      fill="#fff700"
    />
  </svg>
);

const StarOutlineIcon = () => (
  <svg
    data-name="inActiveStar"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 58 58"
  >
    <g id="Polygon_2" data-name="Polygon 2" fill="#f7f7f7">
      <path
        d="M 41.7806510925293 54.21798706054688 C 41.20904922485352 54.21799850463867 40.65338134765625 54.07565689086914 40.12908935546875 53.79490661621094 L 31.12424087524414 48.97309494018555 C 30.47312927246094 48.62444686889648 29.73858070373535 48.44016647338867 29 48.44016647338867 C 28.26141929626465 48.44016647338867 27.52687072753906 48.62444686889648 26.87575912475586 48.97308731079102 L 17.87091064453125 53.79489517211914 C 17.34663009643555 54.07563781738281 16.79096031188965 54.21798706054688 16.21933937072754 54.21798706054688 C 15.20100975036621 54.21798706054688 14.22838020324707 53.76655578613281 13.55082035064697 52.97945785522461 C 12.88498973846436 52.20597839355469 12.60330963134766 51.21489715576172 12.75767040252686 50.18877792358398 L 14.42280960083008 39.11944580078125 C 14.63078022003174 37.73691558837891 14.19758987426758 36.36283493041992 13.234299659729 35.34954833984375 L 5.554780006408691 27.27142715454102 C 4.646729946136475 26.31624603271484 4.35414981842041 24.99978637695312 4.772130012512207 23.74989700317383 C 5.190110206604004 22.50000762939453 6.215750217437744 21.62438583374023 7.515719890594482 21.40760612487793 L 17.90790939331055 19.67458724975586 C 19.34449005126953 19.43502616882324 20.58148956298828 18.50960731506348 21.21689033508301 17.19907760620117 L 25.85063934326172 7.641776561737061 C 26.44960403442383 6.406382083892822 27.62705039978027 5.668716907501221 28.99997138977051 5.668716907501221 C 29.00005531311035 5.668716907501221 28.99991607666016 5.668716907501221 29 5.668716907501221 C 30.37302017211914 5.668706893920898 31.55035018920898 6.406306743621826 32.14936065673828 7.641776561737061 L 36.78311157226562 17.19907760620117 C 37.41849899291992 18.50959587097168 38.65549850463867 19.43501663208008 40.09207916259766 19.67458724975586 L 50.48426818847656 21.40760612487793 C 51.78424835205078 21.62438583374023 52.80989074707031 22.50000762939453 53.22787094116211 23.74989700317383 C 53.64585876464844 24.99978637695312 53.353271484375 26.31624603271484 52.44522094726562 27.27142715454102 L 44.76570129394531 35.34954833984375 C 43.80241012573242 36.36283493041992 43.36922073364258 37.73691558837891 43.57719039916992 39.11944580078125 L 45.2423210144043 50.18877792358398 C 45.39665985107422 51.21477508544922 45.11497116088867 52.20580673217773 44.44911956787109 52.97932815551758 C 43.77151870727539 53.76649856567383 42.79890060424805 54.21796798706055 41.7806510925293 54.21798706054688 Z"
        stroke="none"
      />
      <path
        d="M 29 6.168704986572266 C 27.8231201171875 6.168704986572266 26.81398010253906 6.800926208496094 26.30055046081543 7.859905242919922 L 21.66680145263672 17.41721725463867 C 20.96080017089844 18.87335586547852 19.58634948730469 19.90159606933594 17.99015045166016 20.16777801513672 L 7.597969055175781 21.90079498291016 C 6.483711242675781 22.08660507202148 5.604579925537109 22.83713531494141 5.246311187744141 23.90846633911133 C 4.888038635253906 24.97980499267578 5.138828277587891 26.10819625854492 5.917160034179688 26.92692565917969 L 13.5966796875 35.00504684448242 C 14.66698837280273 36.13089752197266 15.14831924438477 37.65764617919922 14.91724014282227 39.19381713867188 L 13.25210189819336 50.26313781738281 C 13.1197509765625 51.14302825927734 13.36040878295898 51.99185562133789 13.92977142333984 52.65326690673828 C 14.50366973876953 53.3199577331543 15.35958862304688 53.71798706054688 16.21934127807617 53.71798706054688 C 16.70772933959961 53.71798706054688 17.18397903442383 53.59556579589844 17.63489151000977 53.35411834716797 L 26.63973999023438 48.53230667114258 C 27.36318969726562 48.14491653442383 28.17935943603516 47.94015502929688 29 47.94015502929688 C 29.82062911987305 47.94015502929688 30.63680076599121 48.14491653442383 31.36026000976562 48.53230667114258 L 40.36511993408203 53.35411834716797 C 40.81600952148438 53.59556579589844 41.29227066040039 53.71798706054688 41.78066253662109 53.71798706054688 C 42.64031219482422 53.71798706054688 43.49620056152344 53.31992721557617 44.07015228271484 52.65317535400391 C 44.63954162597656 51.99172592163086 44.88022994995117 51.14292526245117 44.74789047241211 50.26313781738281 L 43.08275985717773 39.19382476806641 C 42.85166931152344 37.65766906738281 43.33298873901367 36.13091659545898 44.4033088684082 35.00504684448242 L 52.08283996582031 26.92692565917969 C 52.86116790771484 26.10819625854492 53.1119499206543 24.97980499267578 52.75368118286133 23.90847778320312 C 52.39542007446289 22.83713531494141 51.51628875732422 22.08660507202148 50.40203094482422 21.90078735351562 L 40.00984191894531 20.16777801513672 C 38.41365051269531 19.90159606933594 37.03919982910156 18.87335586547852 36.33319854736328 17.41721725463867 L 31.69944953918457 7.859905242919922 C 31.18601989746094 6.800926208496094 30.1768798828125 6.168704986572266 29 6.168704986572266 M 28.99999618530273 5.168708801269531 C 30.43520545959473 5.168708801269531 31.87041473388672 5.920352935791016 32.59926986694336 7.423637390136719 L 37.2330207824707 16.9809455871582 C 37.79878997802734 18.14785766601562 38.89516067504883 18.96808624267578 40.17433166503906 19.181396484375 L 50.56652069091797 20.91440582275391 C 53.73006057739258 21.44196701049805 55.01739120483398 25.29144668579102 52.80760192871094 27.61592483520508 L 45.12807083129883 35.69404602050781 C 44.27793121337891 36.58831787109375 43.88808059692383 37.82489776611328 44.07162857055664 39.04506683349609 L 45.73675918579102 50.11438751220703 C 46.22637939453125 53.36920547485352 42.79468154907227 55.7894287109375 39.89305877685547 54.23568725585938 L 30.88821029663086 49.41387557983398 C 29.70864105224609 48.78225708007812 28.29135894775391 48.78225708007812 27.11178970336914 49.41387557983398 L 18.10694122314453 54.23568725585938 C 15.20531463623047 55.7894287109375 11.77361679077148 53.36920547485352 12.26322937011719 50.11438751220703 L 13.92837142944336 39.04506683349609 C 14.11191177368164 37.82489776611328 13.72206878662109 36.58831787109375 12.87192153930664 35.69404602050781 L 5.192401885986328 27.61592483520508 C 2.982608795166016 25.29144668579102 4.269931793212891 21.44196701049805 7.433479309082031 20.9144172668457 L 17.82566070556641 19.181396484375 C 19.10483932495117 18.96808624267578 20.20121002197266 18.14786529541016 20.7669792175293 16.9809455871582 L 25.40073013305664 7.423637390136719 C 26.12957954406738 5.920352935791016 27.56478691101074 5.168708801269531 28.99999618530273 5.168708801269531 Z"
        stroke="none"
        fill="#000"
      />
    </g>
    <path
      id="Polygon_7"
      data-name="Polygon 7"
      d="M13.2,3.712a2,2,0,0,1,3.6,0l2.474,5.1a2,2,0,0,0,1.471,1.1l5.539.924A2,2,0,0,1,27.4,14.19l-4.085,4.3a2,2,0,0,0-.528,1.676l.887,5.895a2,2,0,0,1-2.922,2.061l-4.811-2.576a2,2,0,0,0-1.888,0L9.244,28.118a2,2,0,0,1-2.922-2.061l.887-5.895a2,2,0,0,0-.528-1.676L2.6,14.19a2,2,0,0,1,1.121-3.351l5.539-.924a2,2,0,0,0,1.471-1.1Z"
      transform="translate(14 14)"
      fill="#f7f7f7"
    />
  </svg>
);

const StarRating = ({ rating }) => {
  const stars = [];

  const roundedRating = Math.round(rating);

  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      stars.push(<StarIcon key={i} />);
    } else {
      stars.push(<StarOutlineIcon key={i} />);
    }
  }

  return (
    <Tooltip
      label={`${rating} / 5 stars`}
      aria-label="Rating of Restaurant in number"
    >
      <Flex
        className="star-rating"
        gap="0.2rem"
        justifyContent="center"
        p=".4rem"
        mb=".3rem"
        tabIndex={0}
      >
        {stars}
      </Flex>
    </Tooltip>
  );
};

export default StarRating;
