# Semestr předmětu – SemesterGQLModel

Semestrální projekt do předmětu Informatika zaměřený na frontendovou část informačního systému. Aplikace zobrazuje informace o semestru předmětu, jeho tématech a lekcích, umožňuje vybrané údaje upravovat a propojuje semestr s plánem studia předmětu.

Projekt vznikl rozšířením společné šablony poskytnuté vyučujícím. Je součástí většího systému, ve kterém jednotliví studenti vytvářejí frontendové části pro různé GraphQL modely.

- Autorka: Magdalena Cetlová
- GitHub: [Maya0552/frontendui](https://github.com/Maya0552/frontendui)
- Vývojová větev: `monorepo`
- Knihovní balíček: [`@maya0552/semestr`](https://www.npmjs.com/package/@maya0552/semestr)
- Aplikační balíček: [`@maya0552/app_semestr`](https://www.npmjs.com/package/@maya0552/app_semestr)

## Zadání

> **Semestr předmětu (SemesterGQLModel)**  
> Zobrazte informace o semestru předmětu, jednotlivé lekce semestru a navažte na plány studia předmětu pomocí odkazů.

Hlavním modelem projektu je `SemesterGQLModel`. Součástí řešení je také samostatná frontendová podpora pro `TopicGQLModel`, protože témata tvoří vektorový atribut semestru a musí být možné je nejen zobrazit, ale také vytvářet a mazat.

## Cíle projektu

- zobrazit seznam semestrů předmětů;
- zobrazit detail vybraného semestru;
- zobrazit předmět, pořadí semestru, počet kreditů, povinnost a způsob zakončení;
- zobrazit témata semestru a lekce patřící k jednotlivým tématům;
- umožnit oprávněným uživatelům upravovat údaje semestru;
- umožnit vytvoření nového tématu;
- umožnit smazání tématu bez obnovení celé stránky;
- vytvořit odkazy z plánů studia na detail příslušného studijního plánu;
- připravit knihovnu a aplikaci k publikaci prostřednictvím npm.

## Použité technologie

- React;
- Vite;
- React Router;
- React Bootstrap;
- GraphQL;
- Apollo Federation;
- Docker a Docker Compose;
- npm workspaces;
- GitHub Actions;
- společné balíčky `@hrbolek/uoisfrontend-*`.


## Publikace npm

Publikace probíhá pomocí workflow **Publish one workspace** v GitHub Actions. Pro publikaci je potřeba:

1. zvýšit verzi v příslušném `package.json`;
2. sestavit balíček a ověřit jeho obsah;
3. změny commitnout a odeslat na GitHub;
4. v GitHub Actions spustit workflow **Publish one workspace**;
5. zadat přesný název workspace;
6. nejprve publikovat `@maya0552/semestr` a potom `@maya0552/app_semestr`.

Workflow používá repozitářový secret `NPM_TOKEN`. Token nesmí být uložen přímo v repozitáři ani vypsán do dokumentace.

## Vývojový deník

Následující časová osa vychází z historie commitů ve větvi `monorepo`. Popisuje nejen výsledky, ale také problémy, slepé cesty a objevené souvislosti.

### Začátek práce a orientace v projektu

#### 1.–12. dubna 2026

Na začátku pro mě bylo nejdůležitější zorientovat se ve velkém monorepozitáři a pochopit, která komponenta ovlivňuje kterou část výsledné stránky. Projekt vycházel z obecné šablony, ve které bylo mnoho souborů a komponent se stejnými nebo podobnými názvy.

Nejprve jsem hledala, kde se mění obsah detailu. Postupně jsem zjistila, že hlavní zobrazení ovlivňuje komponenta `MediumContent`. Začala jsem v ní nahrazovat obecný výpis konkrétními atributy modelu semestru.

Důležité commity:

- [`c8a9681`](https://github.com/Maya0552/frontendui/commit/c8a9681) – přidání a první úpravy `MediumContent`;
- [`d107933`](https://github.com/Maya0552/frontendui/commit/d107933) – „uprava MediumContent (ready na 1. projektovy den)“.

Výsledkem prvního projektového dne byla funkční readonly stránka. Zobrazovala identifikátor, pořadí, kredity, povinnost, předmět, způsob zakončení a datum poslední změny. V této fázi jsem také dočasně oddělila zobrazení od interaktivních mutací, abych mohla nejprve ověřit správné načítání dat.

Co jsem objevila:

- jak jsou propojené `LargeCard`, `MediumContent`, stránky a GraphQL fragmenty;
- že frontend zobrazí pouze pole, která jsou součástí GraphQL dotazu nebo fragmentu;
- že obecná šablona se musí přizpůsobit konkrétnímu GraphQL modelu;
- jak fungují vlastní cesty a odkazy modelu.

### Mutace semestru

#### 10.–20. května 2026

Cílem druhého projektového dne bylo vytvořit zapisovatelnou stránku a zprovoznit mutace semestru. Postupovala jsem po jednotlivých atributech, protože tak šlo lépe poznat, která změna způsobila případnou chybu.

Důležité commity:

- [`d1b98b1`](https://github.com/Maya0552/frontendui/commit/d1b98b1) – mutace atributu `order`;
- [`485abf3`](https://github.com/Maya0552/frontendui/commit/485abf3) – mutace `credits` a první zpracování `mandatory`;
- [`a43d462`](https://github.com/Maya0552/frontendui/commit/a43d462) – další úpravy mutace `mandatory`;
- [`ba67c97`](https://github.com/Maya0552/frontendui/commit/ba67c97) – nahrazení technických ID čitelnějšími názvy;
- [`2533e7d`](https://github.com/Maya0552/frontendui/commit/2533e7d) – navazující publikace změn.

Pro `order` a `credits` bylo potřeba upravit editovatelný obsah i GraphQL mutaci `semesterUpdate`. U číselných hodnot bylo zároveň nutné ohlídat, aby formulář neposílal textový řetězec místo čísla.

Největší problém představoval atribut `mandatory`. Ve formuláři je reprezentován checkboxem, takže se nečte stejně jako klasický textový vstup. Přidala jsem obsluhu hodnoty `checked` a zkoušela několik způsobů předání boolean hodnoty do změnového stavu. Tlačítko nebo požadavek však v některých situacích nereagovaly očekávaným způsobem a změna se na backendu neprojevila.

Tento problém zatím nepovažuji za definitivně vyřešený. Frontend hodnotu zpracovává, ale je potřeba ještě přesně ověřit výsledný GraphQL požadavek a odpověď backendu. Bez této kontroly nelze spolehlivě určit, zda je zbývající chyba ve formuláři, ve sdílené obsluze mutace, nebo na backendu.

Co jsem objevila:

- rozdíl mezi hodnotou textového vstupu a stavem checkboxu;
- způsob sestavení mutace `semesterUpdate`;
- význam hodnoty `lastchange` při aktualizaci entity;
- potřebu převádět formulářové hodnoty na datové typy očekávané GraphQL schématem;
- práci s rolemi a omezením mutací podle oprávnění.

### Témata jako vektorový atribut

#### 1.–27. června 2026

Třetí projektový den byl zaměřen na témata semestru. Cílem bylo témata zobrazit, vytvořit a smazat. Na rozdíl od jednoduchých atributů jde o vektorový atribut – jeden semestr může obsahovat více topiců a každý topic může obsahovat vlastní lekce.

Důležité commity:

- [`d34376e`](https://github.com/Maya0552/frontendui/commit/d34376e) – témata a čitelnější názvy;
- [`5c4b9b1`](https://github.com/Maya0552/frontendui/commit/5c4b9b1) – první funkční vytváření topicu;
- [`43e73b3`](https://github.com/Maya0552/frontendui/commit/43e73b3) – oprava topic mutací;
- [`3990f39`](https://github.com/Maya0552/frontendui/commit/3990f39) – úprava výsledného zobrazení.

Zpočátku šlo topic vytvořit pomocí tlačítka v detailu, ale nešlo ho odstranit. Smazání fungovalo pouze při ručním spuštění GraphQL operace ve Strawberry/GraphQL rozhraní. To ukázalo, že backendová mutace existuje, ale frontend ji nepoužívá správně.

Dalším problémem bylo, že jsem při pokusu o vytvoření topicu ve skutečnosti vytvářela nový semestr, který se následně ve stránce zobrazil na místě topicu. Příčinou bylo příliš těsné převzetí logiky a komponent z `SemesterGQLModel`. Oba modely sice spolu souvisejí, ale používají jiné GraphQL operace, jiné fragmenty a jiný typ výsledku.

Řešením bylo vytvořit samostatnou složku `TopicGQLModel` s vlastními:

- komponentami;
- dotazy a fragmenty;
- create, update a delete mutacemi;
- stránkami a URI;
- exporty.

V `SemesterGQLModel` jsem navíc vytvořila `TopicTable.jsx`, která témata zobrazuje jako samostatnou tabulku uvnitř detailu semestru. Díky oddělení odpovědností se přestaly zaměňovat entity semestru a topicu a vytvoření i smazání začalo fungovat.

Co jsem objevila:

- jak pracovat s vektorovým atributem;
- proč nestačí pouze zkopírovat mutaci jiného modelu;
- význam `__typename` při zpracování GraphQL výsledku;
- jak aktualizovat rodičovskou entitu po změně jejího vektorového atributu;
- proč má mít každý model vlastní dotazy, mutace a URI.

### Smazání bez obnovení stránky

#### 19. července 2026

Původní implementace po úspěšném smazání topicu volala:

```js
window.location.reload();
```

To sice zajistilo, že smazaný řádek zmizel, ale obnovila se celá stránka. Vyučující upozornil, že takové řešení není vhodné pro React aplikaci.

V commitu [`59c50b7`](https://github.com/Maya0552/frontendui/commit/59c50b7) jsem automatický refresh odstranila. Po úspěšné delete mutaci nyní komponenta předá informaci o smazaném topicu rodičovské tabulce a ta položku odebere z lokálního seznamu. Uživatelské rozhraní se tak aktualizuje okamžitě bez ztráty stavu celé stránky.

Tato změna mi pomohla lépe pochopit hlavní princip Reactu: vzhled stránky má vycházet ze stavu aplikace. Pokud se změní data, má se změnit stav, ne ručně znovu načíst celý dokument.

### Odkazy na studijní plán

#### 19. července 2026

Další částí zadání bylo propojení semestru s projektem studijního plánu. GraphQL fragment semestru načítá pole `plans` a každý plán je zobrazen jako odkaz.

Relevantní commit:

- [`211f962`](https://github.com/Maya0552/frontendui/commit/211f962) – doplnění a oprava odkazů.

Při vývoji se odkazy nejprve vytvářely přes obecnou cestu:

```text
/generic/StudyPlanGQLModel/view/:id
```

Vlastní aplikace však používá cestu:

```text
/studyplan/StudyPlanGQLModel/view/:id
```

Bylo proto potřeba upravit nejen odkaz zobrazený v `MediumContent`, ale také odkazy vznikající v automaticky generovaných tabulkách. V lokální Vite aplikaci nyní propojení vede na vlastní frontend studijního plánu.

### Build a npm publikace

#### 19. července 2026

Při první kontrole se build knihovny sice dokončil, ale výsledné soubory byly prakticky prázdné. Příčinou byl prázdný hlavní soubor `src/index.js`, takže Vite neměl co exportovat. Po doplnění exportů modelů se při buildu objevila další chyba: `CUDButton` byl importován, ale nebyl exportován z komponent.

Postup opravy:

1. doplnění exportů ze `src/index.js`;
2. odstranění neplatných importů ze souborů modelů;
3. opakované spuštění `npm run build`;
4. kontrola obsahu pomocí `npm pack --dry-run`;
5. zvýšení verze balíčku před každou další publikací;
6. nastavení npm tokenu pro GitHub Actions;
7. publikace knihovny a aplikace jako dvou samostatných workspaces.

Relevantní commity:

- [`0fe1957`](https://github.com/Maya0552/frontendui/commit/0fe1957) – úpravy balíčku;
- [`5c68713`](https://github.com/Maya0552/frontendui/commit/5c68713) – navazující opravy;
- [`1773835`](https://github.com/Maya0552/frontendui/commit/1773835) – publikace;
- [`fd4abb5`](https://github.com/Maya0552/frontendui/commit/fd4abb5) – opakovaná publikace po opravách.

Při publikaci jsem narazila také na chyby autorizace npm. Nejprve npm vracelo `401 Unauthorized`, později GitHub Actions vyžadovaly jednorázové heslo. Řešením bylo vytvoření vhodného přístupového tokenu, jeho uložení do GitHub Secrets jako `NPM_TOKEN` a opětovné spuštění workflow.

Výsledkem jsou dva veřejné balíčky: knihovna s modely a samostatná Vite aplikace.

## Integrace do hostitelské aplikace na portu 33001

Lokální aplikace na portu `5173` používá vlastní router a cesty pod `/semestr`. Hostitelská aplikace na portu `33001` ale odkazy z automaticky generovaného seznamu vytváří pod `/generic`.

Stejné chování se objevilo také v projektech spolužáků. Použitým řešením je ruční změna kořene URI v adresním řádku:

```text
http://localhost:33001/generic/SemesterGQLModel/view/:id
```

se změní na:

```text
http://localhost:33001/semestr/SemesterGQLModel/view/:id
```

Po této změně se již spustí moje vlastní stránka místo obecného prohlížeče. Tím se zároveň obejde rozšířený generic GraphQL dotaz, který dříve končil chybou resolveru `EventInvitationGQLModel` ve federované službě `office`.

### Chybějící vzhled publikované aplikace

Po zprovoznění vlastní URI se stránka na `33001` zobrazila bez Bootstrapu a vlastních stylů, přestože stejná stránka na `5173` vypadala správně. Rozdíl způsobovaly dva různé vstupní body aplikace:

- vývojový server na `5173` spouští `main.jsx`;
- publikovanou aplikaci v hostitelském frontendu spouští `StandaloneEntry.jsx`.

`StandaloneEntry.jsx` sice CSS importoval, ale Vite v režimu knihovny styly oddělil do samostatného souboru. Hostitelská aplikace načetla výsledný JavaScript, ale samostatný CSS soubor už automaticky nepřipojila.

Řešením bylo načíst Bootstrap a aplikační CSS pomocí Vite přípony `?inline`:

```jsx
import bootstrapCss from "bootstrap/dist/css/bootstrap.min.css?inline";
import applicationCss from "./index.css?inline";
```

Oba styly se tím stanou textovou součástí JavaScriptového bundlu. Funkce `ensureStyles` při připojení aplikace vytvoří v dokumentu element `<style>` a vloží do něj oba CSS řetězce:

```jsx
const ensureStyles = () => {
    let styleElement = document.getElementById("maya0552-app-semestr-styles");

    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "maya0552-app-semestr-styles";
        document.head.appendChild(styleElement);
    }

    styleElement.textContent = `${bootstrapCss}\n${applicationCss}`;
};
```

Funkce se volá před `createRoot`, takže jsou styly dostupné ještě před vykreslením aplikace. Současně byly odstraněny pomocné debugovací výpisy a v `package.json` byl opraven překlep `"type_"` na platné `"type": "module"`.

Po novém buildu, zvýšení verze a publikaci `@maya0552/app_semestr` se vlastní stránka na portu `33001` zobrazuje stejně jako lokální varianta na `5173`.

Automaticky generované odkazy hostitelské aplikace nadále používají `/generic/`; ruční přepsání tohoto segmentu je proto zatím známý a ověřený workaround.

## Hlavní získané zkušenosti

Během projektu jsem si prakticky vyzkoušela:

- orientaci v rozsáhlejším React monorepozitáři;
- přizpůsobení obecné šablony konkrétnímu GraphQL modelu;
- skládání GraphQL fragmentů a dotazů;
- práci s jednoduchými i vektorovými atributy;
- vytváření formulářů pro čísla a boolean hodnoty;
- GraphQL create, update a delete mutace;
- řízení zobrazení podle uživatelských rolí;
- aktualizaci React stavu bez obnovení stránky;
- registraci vlastních odkazů a práci s routerem;
- diagnostiku rozdílu mezi lokální aplikací a hostitelským frontendem;
- sestavení knihovny pomocí Vite;
- kontrolu obsahu npm balíčku;
- publikaci npm workspaces pomocí GitHub Actions.

Nejdůležitějším zjištěním pro mě bylo, že chyba zobrazená ve frontendu nemusí vznikat přímo v komponentě, která ji ukáže. Pro diagnostiku bylo potřeba odděleně ověřovat React stav, vytvořenou URI, odeslaný GraphQL dotaz, odpověď Apollo gateway a chování jednotlivých federovaných služeb.
