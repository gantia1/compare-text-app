export type Status = "equal" | "deleted" | "added";

export interface CharDiff {
    char: string;
    status: Status;
}

export const lcs = (a: string, b: string): string[] => {
    const m = a.length, n = b.length;
    const dp: number[][] = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    const seq: string[] = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (a[i - 1] === b[j - 1]) {
            seq.unshift(a[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) i--;
        else j--;
    }
    return seq;
};

const classify = (ch: string): Exclude<Status, "equal"> =>
    /\s/.test(ch) ? "deleted" : "added";

export const generateDiff = (a: string, b: string): [CharDiff[], CharDiff[]] => {
    const lcsSeq = lcs(a, b);
    const diffA: CharDiff[] = [];
    const diffB: CharDiff[] = [];

    let i = 0, j = 0, k = 0;

    while (i < a.length || j < b.length) {
        const lcsChar = k < lcsSeq.length ? lcsSeq[k] : null;

        const isEqual = i < a.length && j < b.length && a[i] === b[j] && a[i] === lcsChar;

        if (isEqual) {
            diffA.push({char: a[i], status: "equal"});
            diffB.push({char: b[j], status: "equal"});
            i++;
            j++;
            k++;
            continue;
        }

        if (i < a.length && (lcsChar === null || a[i] !== lcsChar)) {
            diffA.push({char: a[i], status: classify(a[i])});
            i++;
        }
        if (j < b.length && (lcsChar === null || b[j] !== lcsChar)) {
            diffB.push({char: b[j], status: classify(b[j])});
            j++;
        }
    }

    return [diffA, diffB];
};

export const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const renderDiff = (diff: CharDiff[]): string =>
    diff
        .map(({char, status}) => {
            const raw = char === " " ? "&nbsp;" : char === "\n" ? "<br/>" : escapeHtml(char);
            if (status === "equal") return raw;
            return `<span class="${status}">${raw}</span>`;
        })
        .join("");
