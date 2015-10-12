// Tagnames

var T_CONTAINER =               'span';
var T_FACADE =                  'span';
var T_FACADELABEL =             'span';
var T_OPTLIST =                 'div';
var T_OPTGROUP =                'div';
var T_OPTGROUPLABEL =           'span';
var T_OPTION =                  'span';


// Classnames
var C_CONTAINER =               'celesta-container';
var C_CONTAINER_OPEN =          'celesta-container-open';
var C_CONTAINER_DISABLED =      'celesta-container-disabled';
var C_FACADE =                  'celesta-facade';
var C_FACADELABEL =             'celesta-facadelabel';
var C_OPTLIST =                 'celesta-optlist';
var C_OPTLIST_REVERSED =        'celesta-optlist-reversed';
var C_OPTGROUP =                'celesta-optgroup';
var C_OPTGROUP_DISABLED =       'celesta-optgroup-disabled';
var C_OPTGROUPLABEL =           'celesta-optgrouplabel';
var C_OPTION =                  'celesta-option';
var C_OPTION_SELECTED =         'celesta-option-selected';
var C_OPTION_HOVERED =          'celesta-option-hovered';
var C_OPTION_DISABLED =         'celesta-option-disabled';



// Selectors

var S_CONTAINER =               T_CONTAINER + '.' + C_CONTAINER;
var S_CONTAINER_OPEN =          T_CONTAINER + '.' + C_CONTAINER + '.' + C_CONTAINER_OPEN;
var S_CONTAINER_DISABLED =      T_CONTAINER + '.' + C_CONTAINER + '.' + C_CONTAINER_DISABLED;
var S_FACADE =                  T_FACADE + '.' + C_FACADE;
var S_FACADELABEL =             T_FACADELABEL + '.' + C_FACADELABEL;
var S_OPTLIST =                 T_OPTLIST + '.' + C_OPTLIST;
var S_OPTLIST_REVERSED =        T_OPTLIST + '.' + C_OPTLIST + '.' + C_OPTLIST_REVERSED;
var S_OPTGROUP =                T_OPTGROUP + '.' + C_OPTGROUP;
var S_OPTGROUP_DISABLED =       T_OPTGROUP + '.' + C_OPTGROUP + '.' + C_OPTGROUP_DISABLED;
var S_OPTGROUPLABEL =           T_OPTGROUPLABEL + '.' + C_OPTGROUPLABEL;
var S_OPTION =                  T_OPTION + '.' + C_OPTION;
var S_OPTION_SELECTED =         T_OPTION + '.' + C_OPTION + '.' + C_OPTION_SELECTED;
var S_OPTION_HOVERED =          T_OPTION + '.' + C_OPTION + '.' + C_OPTION_HOVERED;
var S_OPTION_DISABLED =         T_OPTION + '.' + C_OPTION + '.' + C_OPTION_DISABLED;



// HTML markup

var M_SELECT_SIMPLE =
    '<select>' +
    '    <option value="1">One</option>' +
    '    <option value="2">Two</option>' +
    '    <option value="3">Three</option>' +
    '</select>';

var M_SELECT_SIMPLE_DISABLED =
    '<select disabled>' +
    '    <option value="1">One</option>' +
    '    <option value="2">Two</option>' +
    '    <option value="3">Three</option>' +
    '</select>';

var M_SELECT_SIMPLE__OPTION_SELECTED =
    '<select>' +
    '    <option value="1">One</option>' +
    '    <option value="2" selected>Two</option>' +
    '    <option value="3">Three</option>' +
    '</select>';

var M_SELECT_SIMPLE__OPTION_DISABLED =
    '<select>' +
    '    <option value="1">One</option>' +
    '    <option value="2" disabled>Two</option>' +
    '    <option value="3">Three</option>' +
    '</select>';

var M_SELECT_SIMPLE__OPTION_DISABLED_SELECTED =
    '<select>' +
    '    <option value="1">One</option>' +
    '    <option value="2" disabled selected>Two</option>' +
    '    <option value="3">Three</option>' +
    '</select>';

var M_SELECT_COMPLEX =
    '<select>' +
    '    <optgroup label="Named with numbers">' +
    '        <option value="1">One Republic</option>' +
    '        <option value="2">Two Steps From Hell</option>' +
    '        <option value="3">Three Days Grace</option>' +
    '        <option value="4">Four Seasons</option>' +
    '        <option value="5">Five Nights At Freddy\'s</option>' +
    '        <option value="6">Six Feet Under</option>' +
    '        <option value="7">Seven Nation Army</option>' +
    '        <option value="8">Eight Below</option>' +
    '        <option value="9">Nine Inch Nails</option>' +
    '        <option value="10">Ten O\'Clock Postman</option>' +
    '        <option value="11">Eleven Madison Park</option>' +
    '        <option value="12">Twelve South</option>' +
    '        <option value="13" disabled>Thirteen Reasons Why</option>' +
    '        <option value="14">Fourteen Actors Acting</option>' +
    '        <option value="15">Fifteen Taylor Swift</option>' +
    '        <option value="16">Sixteen Saltlines</option>' +
    '        <option value="17">Seventeen</option>' +
    '        <option value="18">Eighteen Visions</option>' +
    '        <option value="19">Nineteen Hundred And Eighty Five</option>' +
    '        <option value="20">Twenty Dollars In My Pocket</option>' +
    '    </optgroup>' +
    '    <optgroup label="Disabled optgroup" disabled>' +
    '        <option>These</option>' +
    '        <option>Cannot</option>' +
    '        <option>Be</option>' +
    '        <option>Selected</option>' +
    '    </optgroup>' +
    '    <optgroup label="Guitar players">' +
    '        <option value="satriani">Joe Satriani</option>' +
    '        <option value="blackmore">Richie Blackmore</option>' +
    '        <option value="clapton">Eric Clapton</option>' +
    '        <option value="santana">Carlos Santana</option>' +
    '        <option value="zappa">Frank Zappa</option>' +
    '        <option value="hendrix">Jimi Hendrix</option>' +
    '        <option value="malmsteen">Yngwie J. Malmsteen</option>' +
    '        <option value="berry">Chuck Berry</option>' +
    '        <option value="harrison">George Harrison</option>' +
    '        <option value="burton">James Burton</option>' +
    '        <option value="lennon">John Lennon</option>' +
    '        <option value="paul">Les Paul</option>' +
    '        <option value="tolkki">Timo Tollki</option>' +
    '        <option value="zinchuk">Victor Zinchuk</option>' +
    '    </optgroup>' +
    '    <optgroup label="Domain zones" class="flags">' +
    '        <option value="se" class="flag swe">.se (Sweden)</option>' +
    '        <option value="tr" class="flag tur">.tr (Turkey)</option>' +
    '        <option value="br" class="flag bra">.br (Brazil)</option>' +
    '        <option value="es" class="flag esp">.es (Spain)</option>' +
    '    </optgroup>' +
    '    <optgroup label="Tiny group">' +
    '        <option value="disabled" disabled>Disabled option</option>' +
    '        <option value="enabled">Enabled option</option>' +
    '    </optgroup>' +
    '    <optgroup label="Russian words">' +
    '        <option value="babushka">Бабушка (granny)</option>' +
    '        <option value="krasota">Красота (beauty)</option>' +
    '        <option value="balalaika">Балалайка (balalaika)</option>' +
    '        <option value="electrichka">Электричка (electric train)</option>' +
    '        <option value="odeyalo">Одеяло (blanket)</option>' +
    '    </optgroup>' +
    '</select>';
