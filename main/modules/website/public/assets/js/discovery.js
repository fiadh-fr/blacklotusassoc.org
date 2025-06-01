const html = `
<div class="discovery_searchListItem_KQb6X"><a
    class="discovery_link_bg4kV discovery_externalLink_btR1E discovery_linkDefault_c-jCG discovery_flexRow_-Jvz7 discovery_listItemContainer_p0-ca"
    href="/servers/%id%">
    <img src="%banner%" alt="%currentName%" class="discovery_listSplashImage_5oBjK discovery_desktopOnly_-DVf5"
      >
    <picture>
      <source srcset="%banner%" type="image/gif" media="(prefers-reduced-motion: no-preference)"><img src="%banner%"
        alt="%currentName%" class="discovery_listIconImage_WfKg3 discovery_mobileOnly_eFttR" >
    </picture>
    <div class="discovery_flexCol_u5ZeD">
      <div class="discovery_flexRow_-Jvz7 discovery_listHeaderContainer_Vmn8U">
        <picture>
          <source srcset="%icon%" type="image/gif" media="(prefers-reduced-motion: no-preference)"><img src="%icon%"
            alt="%currentName%" class="discovery_listIconImage_WfKg3 discovery_desktopOnly_-DVf5" >
        </picture>
        <div
          class="discovery_colorStandard_ZFG59 discovery_size14_G8qLw discovery_listName_3CroX discovery_textMedium_F4DXy discovery_strong_ESvhm">
          %currentName%</div> %newBadge% %highlightedBadge%
      </div>
      <div
        class="discovery_colorStandard_ZFG59 discovery_size14_G8qLw discovery_listDescription_eFT9o discovery_textMedium_F4DXy">
        %description%
      </div>
      <div class="discovery_flexRow_-Jvz7">
        <span class="discovery_listMembersSeparatorDot_xTaxN"></span>
        <div class="discovery_memberCount_Hy89M">
          <div
            class="discovery_colorHeaderSecondary_2-Eby discovery_size12_PdswG discovery_listGuildMemberCount_Q3pci discovery_textMedium_F4DXy">
            %members% Membros
          </div>
        </div>
      </div>

      <div class="discovery_flexRow_-Jvz7" style="margin-top: auto;">
        %verified%
        %partner%

        <div class="discovery_listGuildBadgeContainer_fCMAz constellation">

          <div class="discovery_listGuildBadgeIconContainer_e8ZBc">
            <div class="discovery_guildIconContainer_n6vrl">
              <div class="discovery_flowerStarContainer_q444q discovery_verified_AZFr3 discovery_background_KsLDp">
                <img class="flowerStar-serversList" src="%badge%" >
              </div>
            </div>
          </div>
          <div
            class="discovery_colorStandard_ZFG59 discovery_size12_PdswG discovery_listGuildBadgeText_gjhGr discovery_textMedium_F4DXy">
            %constellation%
          </div>
        </div>
      </div>
    </div>
  </a>
</div>
`;

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "’");
}

function updateURL(constellation, query, offset) {
  const url = new URL(window.location.href);
  let updated = false;

  if (query !== null && query !== '') {
    url.searchParams.set('query', query);
    console.log(1111)
  } else {
    console.log(2222)
    url.searchParams.delete('query');
  }

  if (offset !== null) {
    url.searchParams.set('offset', offset);
    updated = true;
  } else {
    url.searchParams.delete('offset');
  }

  if (constellation !== null) {
    url.pathname = `/discovery${constellation}`;
    updated = true;
  }

  sessionStorage.setItem('searchPerformed', 'true');
  window.history.pushState({}, '', url);
  fetchData();
}

function updatePagination(currentPage, totalPages, totalGuilds) {
  const paginationContainer = document.querySelector('.discovery_pageControl_28Wo9');
  paginationContainer.innerHTML = '';

  if (totalPages <= 1) {
    return '';
  } else if (totalGuilds === 0) {
    return '';
  } else {

    const createPageButton = (page, label, disabled = false, active = false) => {
      const button = document.createElement('div');
      button.className = `discovery_roundButton_s9Z5- discovery_pageButton_WGm6n discovery_pageNumber_Ql5jW ${active ? 'discovery_activeButton_hthP1' : ''}`;
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
      button.innerHTML = `<span>${label}</span>`;
      if (disabled) {
        button.classList.add('disabled');
      }
      button.addEventListener('click', () => {
        const offset = (page - 1) * 12;
        updateURL(null, null, offset);
        window.scrollTo(0, 135); // Revenir en haut de la page
      });
      return button;
    };

    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = `discovery_endButton_gDnd4 discovery_pageButton_WGm6n discovery_button_COan8 discovery_lookBlank_7eMy4 colorTransparent discovery_sizeMedium_zVdOw discovery_grow_K2vBH`;
    prevButton.innerHTML = `
    <div class="contents discovery_endButtonInner_efSj-">
      <svg class="discovery_iconCaret_4Kc-W" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fill-rule="evenodd">
          <polygon fill="currentColor" fill-rule="nonzero" points="18.35 4.35 16 2 6 12 16 22 18.35 19.65 10.717 12"></polygon>
          <polygon points="0 0 24 0 24 24 0 24"></polygon>
        </g>
      </svg>
      <span>Back</span>
    </div>
  `;
    if (currentPage === 1) {
      prevButton.disabled = true;
    }
    prevButton.addEventListener('click', () => {
      const offset = (currentPage - 2) * 12;
      updateURL(null, null, offset);
      window.scrollTo(0, 135);
    });
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = createPageButton(i, i, false, i === currentPage);
      paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = `discovery_endButton_gDnd4 discovery_pageButton_WGm6n discovery_button_COan8 discovery_lookBlank_7eMy4 colorTransparent discovery_sizeMedium_zVdOw discovery_grow_K2vBH`;
    nextButton.innerHTML = `
    <div class="contents discovery_endButtonInner_efSj-">
      <span>Next</span>
      <svg class="discovery_iconCaret_4Kc-W" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fill-rule="evenodd">
          <polygon fill="currentColor" fill-rule="nonzero" points="8.47 2 6.12 4.35 13.753 12 6.12 19.65 8.47 22 18.47 12"></polygon>
          <polygon points="0 0 24 0 24 24 0 24"></polygon>
        </g>
      </svg>
    </div>
  `;
    if (currentPage === totalPages) {
      nextButton.disabled = true;
    }
    nextButton.addEventListener('click', () => {
      const offset = currentPage * 12;
      updateURL(null, null, offset);
      window.scrollTo(0, 135);
    });
    paginationContainer.appendChild(nextButton);
  }
}

function showLoader() {
  const container = document.querySelector('#discovery_listit');
  const containerLoader = document.querySelector('#discovery_loader');
  container.style.display = 'none';

  const loaderHTML = `
    <div id="loadingOverlayContainer">
      <div class="searchListItem-3mtFl3" style="background: linear-gradient(90deg, rgba(106,116,128,0.2) 75%, rgba(0,0,0,0) 100%);
        margin-bottom: 20px;
        width: 680px;
        height: 144px;
        padding: 8px;
        border-radius: 8px;">
      </div>
      <div class="searchListItem-3mtFl3" style="background: linear-gradient(90deg, rgba(106,116,128,0.15) 75%, rgba(0,0,0,0) 100%);
        margin-bottom: 20px;
        width: 680px;
        height: 144px;
        padding: 8px;
        border-radius: 8px;">
      </div>
      <div class="searchListItem-3mtFl3" style="background: linear-gradient(90deg, rgba(106,116,128,0.1) 75%, rgba(0,0,0,0) 100%);
        margin-bottom: 20px;
        width: 680px;
        height: 144px;
        padding: 8px;
        border-radius: 8px;">
      </div>
      <div class="searchListItem-3mtFl3" style="background: linear-gradient(90deg, rgba(106,116,128,0.05) 75%, rgba(0,0,0,0) 100%);
        margin-bottom: 20px;
        width: 680px;
        height: 144px;
        padding: 8px;
        border-radius: 8px;">
      </div>
    </div>
  `;

  containerLoader.insertAdjacentHTML('afterbegin', loaderHTML);
}

function hideLoader() {
  setTimeout(() => {
    const loader = document.getElementById('loadingOverlayContainer');
    if (loader) {
      loader.remove();
    }

    const container = document.querySelector('#discovery_listit');
    container.style.display = 'block';
  }, 1500);
}

function fetchData() {
  showLoader();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const offsetParam = parseInt(urlParams.get('offset')) || 0;
  const queryParam = urlParams.get('query');

  const pathArray = window.location.pathname.split('/');
  const constellationParam = pathArray.length > 2 ? pathArray[2] : null;

  let fetchURL = '/api/endpoint';

  if (constellationParam !== null) {
    fetchURL += `/${constellationParam}`;
  }

  const urlParamsArray = [];
  if (offsetParam !== 0) {
    urlParamsArray.push(`offset=${offsetParam}`);
  }
  if (queryParam) {
    urlParamsArray.push(`query=${queryParam}`);
  }
  if (urlParamsArray.length > 0) {
    fetchURL += `?${urlParamsArray.join('&')}`;
  }

  fetch(fetchURL)
    .then(response => response.json())
    .then(api => {
      console.log(api);

      const resultsFoundContainer = document.querySelector('.discovery_colorStandard_ZFG59.discovery_size20_cNvg8.discovery_textMedium_F4DXy.discovery_strong_ESvhm');
      const allGuildsTotal = document.querySelector('.discovery_count_r6p5s');
      const container = document.querySelector('#discovery_listit');
      const constellationsContainer = document.getElementById('constellation-tabs');

      resultsFoundContainer.textContent = `${api.totalGuilds} Servidores Encontrados`;
      allGuildsTotal.textContent = `${api.totalGuilds}`;

      if (api.totalGuilds === 0) {
        container.innerHTML = `
          <div class="discovery_searchNoResultsFoundContainer_Z9Y8X">
            <img src="/footage/artworks/NoResults.svg" alt="" class="discovery_searchNoResultsSvg_7T6U5">
            <h3 class="h3-1dzvQw" style="margin-top: 0px">Ups, não achamos nada aqui!</h3>
          </div>`;
        constellationsContainer.innerHTML = '';
        updatePagination(api.currentPage, 0, 0);
      } else {
        updateGuildsDisplay(api.guilds);  // Afficher les guilds
        updatePagination(api.currentPage, api.totalPages, api.totalGuilds);
        updateUniqueConstellations(api.apiReport.uniqueConstellations, api.apiReport.guildsCount);
      }
      hideLoader();
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
      hideLoader();
    });
}

document.addEventListener('DOMContentLoaded', function () {
  hideLoader();
});


function updateUniqueConstellations(constellations, totalGuilds) {
  const constellationsContainer = document.getElementById('constellation-tabs');
  constellationsContainer.innerHTML = '';

  const constellationElements = constellations.map(constellation => {
    const badgename = constellation.constellation.toLowerCase().replace(' ', '');
    const badgePath = `/footage/icons/${badgename}_badge.svg`;
    return `
      <div class="constellation-item" role="button" tabindex="0" data-constellation="${badgename}">
        <div class="discovery_categoryListItemContainer_tkZr6 discovery_categoryListItem_yJGxq">
          <div class="discovery_categoryListItemIcon_LFlJA">
            <img aria-hidden="false" width="20" height="20" viewBox="0 0 24 24" src="${badgePath}">
          </div>
          <div class="discovery_colorStandard_ZFG59 discovery_size14_G8qLw discovery_categoryListItemText_pIXEh discovery_textMedium_F4DXy">
            <span>${constellation.constellation}</span><span class="discovery_count_r6p5s">${constellation.count}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  constellationsContainer.innerHTML = `
    <div class="constellation-item" role="button" tabindex="0" data-constellation="all">
      <div class="discovery_categoryListItemContainer_tkZr6 discovery_categoryListItem_yJGxq ${''}">
        <div class="discovery_categoryListItemIcon_LFlJA ${''}">
          <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z">
            </path>
          </svg>
        </div>
        <div class="discovery_colorStandard_ZFG59 discovery_size14_G8qLw discovery_categoryListItemText_pIXEh discovery_textMedium_F4DXy">
          <span>Todos</span><span class="discovery_count_r6p5s">${totalGuilds}</span>
        </div>
      </div>
    </div>
    ${constellationElements}
  `;

  const constellationItems = constellationsContainer.querySelectorAll('.constellation-item');
  constellationItems.forEach(item => {
    item.addEventListener('click', function () {
      constellationItems.forEach(i => {
        i.classList.remove('selected');
        i.querySelector('.discovery_categoryListItemContainer_tkZr6').classList.remove('discovery_selected_zqL6L');
        i.querySelector('.discovery_categoryListItemIcon_LFlJA').classList.remove('discovery_selected_zqL6L');
        i.querySelector('.discovery_colorStandard_ZFG59').classList.remove('discovery_selected_zqL6L');
      });

      item.classList.add('selected');
      item.querySelector('.discovery_categoryListItemContainer_tkZr6').classList.add('discovery_selected_zqL6L');
      item.querySelector('.discovery_categoryListItemIcon_LFlJA').classList.add('discovery_selected_zqL6L');
      item.querySelector('.discovery_colorStandard_ZFG59').classList.add('discovery_selected_zqL6L');

      const selectedConstellation = item.getAttribute('data-constellation');
      updateGuildsByConstellation(selectedConstellation);
    });
  });

  const path = window.location.pathname;
  const pathSegments = path.split('/');
  let selectedConstellation = pathSegments[pathSegments.length - 1];
  if (!selectedConstellation || selectedConstellation === 'discovery') {
    selectedConstellation = 'all';
  }
  const selectedElement = document.querySelector(`.constellation-item[data-constellation="${selectedConstellation}"]`);

  if (selectedElement) {
    selectedElement.classList.add('selected');
    selectedElement.querySelector('.discovery_categoryListItemContainer_tkZr6').classList.add('discovery_selected_zqL6L');
    selectedElement.querySelector('.discovery_categoryListItemIcon_LFlJA').classList.add('discovery_selected_zqL6L');
    selectedElement.querySelector('.discovery_colorStandard_ZFG59').classList.add('discovery_selected_zqL6L');
  }
}

function updateGuildsByConstellation(constellation) {
  console.log(`Selected constellation: ${constellation}`);

  const constellationUrl = (constellation === "all") ? '' : `/${constellation}`;

  const searchBar = document.querySelector('.discovery_searchBoxInput_PGW0a');
  if (searchBar) {
    searchBar.value = '';
  }

  updateURL(constellationUrl, null, null);
}

document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.querySelector('.discovery_searchBoxInput_PGW0a');
  const searchButton = document.querySelector('.discovery_searchButton_zQhtM');

  searchButton.addEventListener('click', () => updateURL(null, searchBar.value, null));

  searchBar.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      updateURL(null, searchBar.value, null);
    }
  });

  fetchData();
  window.addEventListener('popstate', function () {
    fetchData();
  });
});

function updateGuildsDisplay(guilds) {
  const container = document.querySelector('#discovery_listit');
  container.innerHTML = '';

  guilds.forEach(guild => {
    const badgename = guild.constellation.toLowerCase().replace(' ', '');
    const badgePath = `/footage/icons/${badgename}_badge.svg`

    const newBadge = guild.newServer ? `
    <div class="discovery_newBadgeColor_Z7J4T discovery_flexRow_-Jvz7 discovery_listGuildBadgeContainer_fCMAz" style="margin-left: 7px; margin-top: auto; margin-bottom: auto;">
  <div class="discovery_listGuildBadgeIconContainer_e8ZBc">
    <div class="discovery_guildIconContainer_n6vrl">
      <div class="discovery_flowerStarContainer_q444q discovery_verified_AZFr3 discovery_background_KsLDp">
        <svg class="discovery_flowerStar_d2teU" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16">
          <path fill="#fff" fill-rule="evenodd"
            d="M16,8c0,0.8-1.3,1.4-1.5,2.1c-0.2,0.7,0.4,2,0,2.6C14,13.3,12.6,13,12,13.5c-0.6,0.4-0.8,1.8-1.5,2.1
  S8.8,14.8,8,14.8c-0.8,0-1.8,1-2.5,0.8S4.6,13.9,4,13.5s-2-0.2-2.5-0.8s0.2-1.8,0-2.6S0,8.8,0,8s1.3-1.4,1.5-2.1s-0.4-2,0-2.6
  S3.4,3,4,2.5s0.8-1.8,1.5-2.1S7.2,1.2,8,1.2s1.8-1,2.5-0.8c0.7,0.2,0.9,1.6,1.5,2.1c0.6,0.4,2,0.2,2.5,0.8c0.5,0.6-0.2,1.8,0,2.6
  S16,7.2,16,8z">
          </path>
        </svg>
        <div class="discovery_childContainer_glMeq"><svg class="discovery_icon_3dLwB" aria-hidden="false" width="16"
            height="16" viewBox="0 0 16 16">
            <path d="M13.1,6c0,0.6,0,1.2-0.1,1.8c-0.1,0.7-0.4,1.3-1,1.8c-0.4,0.4-1,0.7-1.6,0.8c-0.2,0-0.5,0.1-0.7,0.1
    c-0.4,0-0.7,0-1.1,0c0,0-0.1,0-0.1,0c0,0.8,0,1.7,0,2.5c-0.3,0-0.7,0-1,0c0,0,0-0.1,0-0.1c0-1.1,0-2.2,0-3.4c0-0.5,0-1,0.2-1.4
    c0.4-1.1,1.2-1.8,2.3-2.1C10.2,6,10.5,6,10.8,6c0.7,0,1.4,0,2.2,0C13,6,13,6,13.1,6z" fill="#35d477"></path>
    <path d="M7,9C6.2,9.1,5.4,9,4.7,8.5C3.5,7.8,2.9,6.8,2.9,5.5c0-0.5,0-0.9,0-1.4c0,0,0-0.1,0-0.1c0,0,0,0,0.1,0
    c0.7,0,1.5,0,2.2,0c1,0,1.8,0.5,2.5,1.2c0.3,0.3,0.5,0.7,0.6,1.1c0,0.1,0,0.1,0,0.2C7.8,6.8,7.6,7.2,7.3,7.7C7.1,8.1,7,8.5,7,9
    C7,9,7,9,7,9z" fill="#35d477"></path>
          </svg></div>
      </div>
    </div>
  </div>
  <div
    class="discovery_newTextBadgeColor_H3W1N discovery_colorStandard_ZFG59 discovery_size12_PdswG discovery_listGuildBadgeText_gjhGr discovery_textMedium_F4DXy">
    Novo!</div>
</div>
    ` : '';
    console.log(guild)
    const highlightedBadge = guild.highlighted1.value ? `
    <div class="discovery_highlightedBadgeColor_Z7J4T discovery_flexRow_-Jvz7 discovery_listGuildBadgeContainer_fCMAz" style="margin-left: 7px; margin-top: auto; margin-bottom: auto;">
  <div class="discovery_listGuildBadgeIconContainer_e8ZBc">
    <div class="discovery_guildIconContainer_n6vrl">
      <div class="discovery_flowerStarContainer_q444q discovery_verified_AZFr3 discovery_background_KsLDp">
        <svg class="discovery_flowerStar_d2teU" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16">
          <path fill="#fff" fill-rule="evenodd"
            d="M16,8c0,0.8-1.3,1.4-1.5,2.1c-0.2,0.7,0.4,2,0,2.6C14,13.3,12.6,13,12,13.5c-0.6,0.4-0.8,1.8-1.5,2.1
	S8.8,14.8,8,14.8s-1.8,1-2.5,0.8S4.6,13.9,4,13.5s-2-0.2-2.5-0.8s0.2-1.8,0-2.6S0,8.8,0,8s1.3-1.4,1.5-2.1s-0.4-2,0-2.6S3.4,3,4,2.5
	s0.8-1.8,1.5-2.1S7.2,1.2,8,1.2s1.8-1,2.5-0.8S11.4,2,12,2.5c0.6,0.4,2,0.2,2.5,0.8s-0.2,1.8,0,2.6S16,7.2,16,8z">
          </path>
        </svg>
        <div class="discovery_childContainer_glMeq"><svg class="discovery_icon_3dLwB" aria-hidden="false" width="16"
            height="16" viewBox="0 0 16 16">
            <path d="M6.1,7.6c-0.1,0-0.1,0-0.2,0c-0.7,0-1.4,0-2.1,0c0,0-0.1,0-0.1,0c-0.1,0-0.2-0.2-0.1-0.3c0,0,0.1-0.1,0.1-0.1
    c1.3-1.3,2.7-2.7,4-4c0,0,0.1-0.1,0.1-0.1C7.9,3,8,3,8.1,3c0,0,0.1,0.1,0.1,0.1c1.3,1.3,2.7,2.7,4,4c0,0,0.1,0.1,0.1,0.1
    c0.1,0.1,0,0.3-0.1,0.3c0,0-0.1,0-0.1,0c-0.7,0-1.4,0-2,0c0,0-0.1,0-0.2,0c0,0.1,0,0.1,0,0.2c0,1.6,0,3.3,0,4.9
    C9.9,13,9.8,13,9.6,13c-1,0-2.1,0-3.1,0c-0.2,0-0.3-0.1-0.3-0.3c0-1.7,0-3.3,0-5C6.1,7.7,6.1,7.7,6.1,7.6z" fill="#404eed"></path>
          </svg></div>
      </div>
    </div>
  </div>
  <div
    class="discovery_highlightedTextBadgeColor_H3W1N discovery_colorStandard_ZFG59 discovery_size12_PdswG discovery_listGuildBadgeText_gjhGr discovery_textMedium_F4DXy">
    Destaque!</div>
</div>
    ` : '';
    const verifiedBadge = guild.verified ? `
    <div class="discovery_flexRow_-Jvz7 discovery_listGuildBadgeContainer_fCMAz" style="margin-right: 7px;">
  <div class="discovery_listGuildBadgeIconContainer_e8ZBc">
    <div class="discovery_guildIconContainer_n6vrl">
      <div class="discovery_flowerStarContainer_q444q discovery_verified_AZFr3 discovery_background_KsLDp">
        <svg class="discovery_flowerStar_d2teU" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16">
          <path fill="currentColor" fill-rule="evenodd"
            d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z">
          </path>
        </svg>
        <div class="discovery_childContainer_glMeq"><svg class="discovery_icon_3dLwB" aria-hidden="false" width="16"
            height="16" viewBox="0 0 16 16">
            <path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="#fff"></path>
          </svg></div>
      </div>
    </div>
  </div>
  <div
    class="discovery_colorStandard_ZFG59 discovery_size12_PdswG discovery_listGuildBadgeText_gjhGr discovery_textMedium_F4DXy">
    Verified</div>
</div>
    ` : '';
    const partnerBadge = guild.partner ? `
     <div class="discovery_flexRow_-Jvz7 discovery_listGuildBadgeContainer_fCMAz" style="margin-right: 7px;">
  <div class="discovery_listGuildBadgeIconContainer_e8ZBc">
    <div class="discovery_guildIconContainer_n6vrl">
      <div class="discovery_flowerStarContainer_q444q discovery_verified_AZFr3 discovery_background_KsLDp">
        <svg class="discovery_flowerStar_d2teU" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16">
          <path fill="#5868f3" fill-rule="evenodd"
            d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z">
          </path>
        </svg>
        <div class="discovery_childContainer_glMeq"><svg class="icon_d082f7" aria-hidden="true" role="img" width="24"
            height="24" viewBox="0 0 16 16">
            <path
              d="M10.5906 6.39993L9.19223 7.29993C8.99246 7.39993 8.89258 7.39993 8.69281 7.29993C8.59293 7.19993 8.39317 7.09993 8.29328 6.99993C7.89375 6.89993 7.5941 6.99993 7.29445 7.19993L6.79504 7.49993L4.29797 9.19993C3.69867 9.49993 2.99949 9.39993 2.69984 8.79993C2.30031 8.29993 2.50008 7.59993 2.99949 7.19993L5.99598 5.19993C6.79504 4.69993 7.79387 4.49993 8.69281 4.69993C9.49188 4.89993 10.0912 5.29993 10.5906 5.89993C10.7904 6.09993 10.6905 6.29993 10.5906 6.39993Z"
              fill="#fff"></path>
            <path
              d="M13.4871 7.79985C13.4871 8.19985 13.2874 8.59985 12.9877 8.79985L9.89135 10.7999C9.29206 11.1999 8.69276 11.3999 7.99358 11.3999C7.69393 11.3999 7.49417 11.3999 7.19452 11.2999C6.39545 11.0999 5.79616 10.6999 5.29674 10.0999C5.19686 9.89985 5.29674 9.69985 5.39663 9.59985L6.79499 8.69985C6.89487 8.59985 7.09463 8.59985 7.19452 8.69985C7.39428 8.79985 7.59405 8.89985 7.69393 8.99985C8.09346 8.99985 8.39311 8.99985 8.69276 8.79985L9.39194 8.39985L11.3896 6.99985L11.6892 6.79985C12.1887 6.49985 12.9877 6.59985 13.2874 7.09985C13.4871 7.39985 13.4871 7.59985 13.4871 7.79985Z"
              fill="#fff"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div
    class="discovery_colorStandard_ZFG59 discovery_size12_PdswG discovery_listGuildBadgeText_gjhGr discovery_textMedium_F4DXy">
    Partner</div>
</div>
    ` : '';

    const modifiedHtml = html
      .replace(/%id%/g, guild.id)
      .replace(/%banner%/g, guild.banner || guild.icon)
      .replace(/%icon%/g, guild.icon)
      .replace(/%currentName%/g, guild.currentName)
      .replace(/%description%/g, guild.description || `${guild.currentName} é um verdadeiro espaço acolhedor e vibrante para todos! Explore e compartilhe experiências únicas!`)
      .replace(/%members%/g, formatNumber(guild.members))
      .replace(/%badge%/g, badgePath)
      .replace(/%constellation%/g, guild.constellation)
      .replace(/%newBadge%/g, newBadge)
      .replace(/%highlightedBadge%/g, highlightedBadge)
      .replace(/%verified%/g, verifiedBadge)
      .replace(/%partner%/g, partnerBadge);

    container.innerHTML += modifiedHtml;
  });
}

