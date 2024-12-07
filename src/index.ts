import {app} from "./app";
import {SETTINGS_CONFIG} from "./settings";


app.listen(SETTINGS_CONFIG.PORT, () => {
    console.log(`Listening on port in ${SETTINGS_CONFIG.PORT}`);
});

