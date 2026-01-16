class SearchService {
    async advancedSearch({
        minYas,
        maxYas,
        minDeger,
        maxDeger,
        mevki,
        ulke,
        takim
    }) {
        let query = `
            SELECT o.*, t.takim_adi
            FROM oyuncular o
            LEFT JOIN takımlar t ON o.takim_id = t.id
            WHERE 1=1
        `;
        const params = [];

        if (minYas) {
            query += ' AND o.yas >= ?';
            params.push(minYas);
        }
        if (maxYas) {
            query += ' AND o.yas <= ?';
            params.push(maxYas);
        }
        if (minDeger) {
            query += ' AND o.deger >= ?';
            params.push(minDeger);
        }
        if (maxDeger) {
            query += ' AND o.deger <= ?';
            params.push(maxDeger);
        }
        if (mevki) {
            query += ' AND o.mevki = ?';
            params.push(mevki);
        }
        if (ulke) {
            query += ' AND o.ulke = ?';
            params.push(ulke);
        }
        if (takim) {
            query += ' AND t.id = ?';
            params.push(takim);
        }

        const [rows] = await db.execute(query, params);
        return rows;
    }
} 