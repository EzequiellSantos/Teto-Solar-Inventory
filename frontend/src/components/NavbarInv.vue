<template>
    <div id="nav">

        <div class="links-menu-container">
        

                
            <section id="home">
                <router-link  to="/">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/0lEQVR4nO2ZW0sVURTHDymUKWFkDwZlNwoy6QMU1EfoOaX0ocweVLCblPUdKpDqLboKVk/6EbrRzcLKbhTZY1fTCusXi9aWxW7PmZkzx/KEfxg456x9/nutmXXba3K5WfynAHYDL4DnQGuulAC08Ceac6UAYD3wJWDABLAhN5MBVAGPjNIP9XIQWVVupgI4Y5QdA9YBa4BP5veL/0Kx5cAmYCVQHrGm1XOZRiNr9GS7IjjKdQ/Zq65Yyh8CfpjNvwMjwCBwAugE2tTHHU4GeE568SD/6VSOQeUUbodJoLsYd94qnwR3gXkBrnkqS4NJYGkWA+RROowDb2I2FPnKPHziHqMJOMbN941ZDJANHUb1twpNlVuBLqAXuAQcBhYl4KwBeoA+/W+Xcglnha6xRq7IYkAZ8E2JfgKVBZMl33O+7oXGRFlWQgkuh4aYtQu1Cl8FHmsqHdPPV6QaA9UxHA1mv5FMyiuhZAiHrRFrxK26gQ/E4z1wMBToAnUnh4FcVmiac+gKyJcAN0mPO6EMA+w1a44VwwDJ1Q69AeVfe4rdB9q1ClfqVQ90AEPe2tfC4XFKYDt0FsOAPYbwvOc2t4zsq1bjOXm45mibLWsdblh3klbDyPZkVb7Vq7CHjazbU35zCt4tnhH7jUxSrMNEQWcJ7SrPBQrMIpNtbMCm3kRbCRvY1aZO+MXuXOIuVguKbYkF94BVEQeW+/ncJqbGDBmeHUa2Sve0EJ3Wx5G2BA4jp1yFNOskpzu0p1Xe8HQYnn5PVqF7W4huLUkeqeAz0BSx9olZty6DAfWG53HEmibVxWJ3aOHLpI/LIyz4hMXvWJu6YXnWrfXc7Vlo0fN/YMACw/MxhQFPk5yoxmawC+2KImwOBPHpmCDuKFKV708YxM1J0uhwTBoVQx2GMqTRB4Zne0waHY5No15wnfUIpLjUmEImxSc6K6RrUd7FFLKzBcWa+JrXSvQYmbTEDtIWbMnQSuwzsiPm94lIfy/wTl3wDuk3PCPaYpq5MuWzyl8D5kY0c22ZlC+wnR7SCluvrlilnzs9nxe8AmrztNMFJ4g0B5pa4DrpcftvHWiSHCnFnfZ7gR0FCdh91m2m+0iZ5lBfLV0lcFmr+We95HO/pMqUh/onWZUvN+O+0hurEB5szde7ZAdbfZr+ahJwLgaOBgZbDdMx2PJHi3FjwVFbsQN8q4G3CTjGizVarNMBaxrc83sn09v47cH0DnfN4d0a8U270QHguOZ8f7x+KsAjTaE/Xu9QjoGI8fqBTMqbzZfJoxR/jAoqbTssmryW2GJnnkq9QvfKduen8RXTVDtSii/5hmf0Sz6B9j2l+ZrVAdhWsi+6vaB+qlcwaGeR+w/wC0V9DPgj7SETAAAAAElFTkSuQmCC">
                    </router-link>
            </section>
                
            <router-link id="register" to="/registerInv">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKElEQVR4nO2Yy0ocQRSGx0EmMdlo3sFs3Ipk4RvoxssT6MadCAqOohJB0aUbV+ojuBaXQRNQcaMomuwVxAuIC+PoFxqrsWzHqq7u6jND6B8ahq5T5/zf1KW7q1DIlSuXVcAnYBb4A1Rw1z2wBBQLNTL/Cz9aFYfg+Z/3qRVRCJ6nTagyUHLsX1sIXs/5UoL+tR0JNKXtr9aALAR+ARqA5SpQRf/Oqxjw0V8cAs8A4hBkACAKQUYAqq0YWdgPQOc7eXqAM+AC6JcEMG7DvEA8hMaARmAM2AeugBPVHupCEkB/EE4YIDrU7xZgC7POJQG+W8z8Bfo083uW+GAkeiUBmoDtBOYfgRF1f1y7f+BqIBWABjED/NbWhM38QKR/qGtxAEv+FpN5FTOstR/WDQDxzA+q+6HKdQGQ0PxP5zfiLACAZmBHS/0EDEViBiLmg2fClyTFvAKImo8DAMyrj3aT5lNMm90AupBUMQBuLebvQgPApqj5mABzlhFYV3HfxM3HAYgrYFFLtSpi3jPAsZaqK455XF6bswQAvmppbtVi7gbWTOaDF7d6ARiNLOrgiuqN+bSj7mMbbVMxPzBrQ5/z+seLBIBpG/2sYm6qtB0BC+GHjEtNyW20XcVMAZdqJILp1JqmppO8JqtFTXIAd5GPgMfjdVcBH7R6FR8Jrec6vgSUgEmt3qmPpLZznSw17QPAdK6TpbaAj6kBDOc6Waiiakx7M58r13+ufwTdIAUDbPUOAAAAAElFTkSuQmCC"></router-link>
        </div>

    </div>
</template>


<script>
export default {
    
    name:"NavbarInv"

}
</script>

<style scoped>
    
    #nav{
        position: fixed;
        width: 100%;
        padding: 10px;
        height: 50px;
        background-color: var(--color-main00);
        opacity: 0.7;
    }

    .links-menu-container > #register{
        position: absolute;
        right: 10px;
        margin-top: 5px;
    }

    #register > img{
        padding: 10px;
        margin: -25px 5px 10px 0px;

    }

    

    #home{
        position: absolute ;
        display: block;
        left: 10px;
        height: 50px;

        width: 50px;
        padding: 0 0 10px 0;
    }

    #home > a{
        position: relative;
        z-index: 1;
        display: block;
        margin-top: -8px;

    }

    #home > img{
        position: inherit;
        display: inline-block;
        width: 100%;
        z-index: -2;
    }

    

</style>