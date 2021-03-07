export type Organization = {
  name?: string;
  workType?: 'Direct Service' | 'Advocacy' | 'Networking' | 'Nothing';
  organizationType?: 'Grassroots' | 'Statewide' | 'National';
  address?: string;
  ein?: string;
  website?: string;
  lgbtqDemographic: (
    | 'All LGBTQ'
    | 'SGL'
    | 'Transgender'
    | 'Asexual/Aromantic'
    | 'Other'
  )[];
  raceDemographic: (
    | 'Black'
    | 'Asian'
    | 'Pacific Islander'
    | 'Latinx'
    | 'Native/Indigenous'
    | 'Other'
  )[];
  ageDemographic: ('Children' | 'Teens' | 'Adults' | 'Seniors')[];
  missionStatement?: string;
  shortHistory?: string;
};
