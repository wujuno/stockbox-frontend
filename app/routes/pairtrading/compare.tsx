import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Page } from '@/components/Layout';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useRecoilValueLoadable } from 'recoil';
import { CountryType, RunData, runSelectorFamily } from '@/modules/pairtrading';
import { Box, Button, MobileStepper, Paper, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import styled from '@emotion/styled';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useHydrated } from 'remix-utils';

interface CompareCarouselProps {
  country: CountryType;
  comId1: string;
  comId2: string;
  comname1: string;
  comname2: string;
}

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;
    const user = await getUser(request);
    const { country, comId1, comId2, comname1, comname2 } = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );
    return json({
      user,
      country: country as CountryType,
      comId1,
      comId2,
      comname1,
      comname2
    });
  } catch (err) {
    console.error(err);
    return redirect('/pairtrading');
  }
};

const Container = styled(Page)`
  .contents {
    height: calc(100vh - 48px);

    .chart-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 15px;

      .chart-img-wrapper {
        flex: 1;
      }
    }
  }
`;

const CompareCarousel = ({ country, comId1, comId2, comname1, comname2 }: CompareCarouselProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const runDataLoadable = useRecoilValueLoadable(
    runSelectorFamily({ country, comname1: comId1, comname2: comId2 })
  );

  const chartLabels = useMemo(() => {
    if (runDataLoadable.state !== 'hasValue') return [];
    return Object.keys(runDataLoadable.contents);
  }, [runDataLoadable]);

  const handleStepChange = useCallback((step: number) => {
    setActiveStep(step);
  }, []);

  const handleClickPrevButton = useCallback(() => {
    setActiveStep((activeStep + chartLabels.length - 1) % chartLabels.length);
  }, [activeStep, chartLabels.length]);

  const handleClickNextButton = useCallback(() => {
    setActiveStep((activeStep + chartLabels.length + 1) % chartLabels.length);
  }, [activeStep, chartLabels.length]);

  return (
    <div className="chart-wrapper">
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pl: 2,
          bgcolor: 'background.default',
          gap: '15px'
        }}
      >
        {comname1 && comname2 && <Typography variant="h4">{`${comname1}, ${comname2}`}</Typography>}
        {chartLabels.length > 0 && <Typography variant="h5">{chartLabels[activeStep]}</Typography>}
      </Paper>
      {runDataLoadable.state === 'hasValue' && (
        <>
          <SwipeableViews
            className="chart-img-wrapper"
            autoPlay
            index={activeStep}
            enableMouseEvents
            containerStyle={{ alignItems: 'center', width: '100%', height: '100%' }}
            slideStyle={{ width: '100%', height: '100%' }}
            onChangeIndex={handleStepChange}
          >
            {chartLabels.map(d => (
              <div
                key={d}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 'auto',
                  height: '100%'
                }}
              >
                <Box
                  component="div"
                  sx={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundImage: `url('${runDataLoadable.contents[d as keyof RunData]}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                  }}
                />
              </div>
            ))}
          </SwipeableViews>
          <MobileStepper
            steps={chartLabels.length}
            position="static"
            activeStep={activeStep}
            sx={{
              justifyContent: 'center',
              gap: '30px'
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleClickNextButton}
                disabled={
                  activeStep === chartLabels.length - 1 || runDataLoadable.state !== 'hasValue'
                }
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleClickPrevButton}
                disabled={activeStep === 0 || runDataLoadable.state !== 'hasValue'}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </>
      )}
    </div>
  );
};

const Compare = () => {
  const loaderData = useLoaderData<typeof loader>();
  console.log(loaderData);

  const isHydrated = useHydrated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaderData?.comId1 || !loaderData?.comId2) navigate('/pairtrading');
  }, [loaderData, navigate]);

  return <Container>{isHydrated && <CompareCarousel {...loaderData} />}</Container>;
};

export default Compare;
