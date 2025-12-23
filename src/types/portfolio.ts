export interface Project {
    id: number;
    name: string;
    description: string;
    type: string;
    live: string | null;
    github: string;
    technologies: string[];
    keyFeatures: string[];
    features: string[];
}

export interface SkillSet {
    frontend?: string[];
    backend?: string[];
    databases?: string[];
    tools?: string[];
    specializations?: string[];
    [key: string]: string[] | undefined;
}

export interface PortfolioData {
    personalInfo: {
        name: string;
        age: number;
        email: string;
        location: {
            city: string;
            state: string;
            country: string;
        }
    };
    education: {
        currentStatus: string;
        college: {
            name: string;
            location: string;
            degree: string;
            field: string;
            studentId: string;
        }
    };
    about: {
        summary: string;
        keyTraits: string[];
        interests: string[];
    };
    projects: Project[];
    skills: SkillSet;
    workExperience: {
        company: string;
        role: string;
        type: string;
        location: string;
    }[];
    careerFocus: {
        targetRoles: string[];
        targetCompanies: string[];
        recruitmentStage: string;
    };
    deploymentPlatforms: string[];
    additionalInfo: {
        githubPresence: string;
        competitiveProgramming: string;
        systemDesign: string;
    };
}
