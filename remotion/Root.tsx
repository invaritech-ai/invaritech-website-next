import { Composition } from "remotion";
import { HeroVariance, HERO_VARIANCE_DURATION_FRAMES } from "./HeroVariance";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="HeroVariance"
                component={HeroVariance}
                durationInFrames={HERO_VARIANCE_DURATION_FRAMES}
                fps={30}
                width={1080}
                height={720}
                defaultProps={{}}
            />
        </>
    );
};
