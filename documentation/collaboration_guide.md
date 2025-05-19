# HomeTruth Development Collaboration Guide

## Project Context

- This is a startup project
- Founder is not a coder but understands product requirements
- Need to maintain clear communication about technical implementations
- Use house/property analogies to explain technical concepts

## Communication Preferences

1. **Direct Action Over Permission**

   - When given instruction to "fix it" - proceed with the fix
   - Show the complete solution rather than fragments
   - Explain what was fixed after implementation

2. **House Analogy Framework**

   - Front Door = Authentication
   - Security Guard = Protected Routes
   - Document Storage Room = Document Management
   - AI Butler = Chat Interface
   - Visitor Passes = User Tokens
   - VIP Areas = Pro Features

3. **Problem-Solving Flow**

   - Identify the issue
   - Explain the fix using house analogy
   - Implement the complete solution
   - Confirm the fix
   - Move to next issue

4. **Code Organization**

   - Check @Codebase for existing files before creating new ones
   - Keep folder structure with index.tsx files
   - Maintain clear separation between mock and real implementations
   - Document future implementation plans in comments
   - Avoid creating duplicate pages/components

5. **Development Priorities**
   - Focus on working mock system first
   - Plan for real API integration later
   - Maintain type safety throughout
   - Keep authentication and authorization clear

## Working Style

- Questions are welcome for clarity
- Avoid repetitive questions about the same issue
- Trust founder's direction about file structure and organization
- Provide complete solutions rather than incremental fixes
- Keep focus on current task until resolved

## Key Files Context

- `lib/api.ts` - Mock backend services
- `context/AuthContext.tsx` - Authentication management
- `store/` - State management
- `types/` - TypeScript definitions
- `components/` - Reusable UI components
- `pages/` - Route components

## Testing Credentials

- Free User: free@hometruth.com / free123
- Pro User: pro@hometruth.com / pro123

## Development Flow

1. **Mock Implementation First**

   - Set up working mock system (like our current auth setup)
   - Test with mock data
   - Document future API integration points

2. **Type Safety**

   - Define types early (`types/` directory)
   - Use TypeScript strictly
   - Document type structures

3. **File Organization**

   - Keep `<relevant_files>` list updated
   - Maintain folder structure with index.tsx
   - Document component relationships

4. **Testing Strategy**
   - Test mock implementations first
   - Use test credentials consistently
   - Document expected behaviors

## Common Analogies Reference

1. **Authentication System**

   - Front Door = Main authentication flow
   - Security Desk = AuthContext
   - Visitor Passes = JWT tokens
   - Guest List = TEST_USERS

2. **Document Management**

   - Storage Room = Document repository
   - Filing System = Categories/tags
   - Access Levels = Permissions

3. **AI Integration**
   - Butler = AI assistant
   - Standard Responses = Mock AI replies
   - Learning System = Real AI integration (future)

## Documentation Maintenance

1. **Specification Updates**

   - Update relevant specification files when implementing changes
   - Keep specifications in sync with actual implementation
   - Example files:
     - `documentation/document_vault_specification.md`
     - `documentation/auth_specification.md`
     - Other feature-specific specifications

2. **Update Process**

   - Identify affected specification files
   - Document new functionality or changes
   - Remove outdated information
   - Ensure specifications match implemented features
   - Update access levels and permissions if changed

3. **Version Control**
   - Note major specification changes in commits
   - Keep track of specification versions
   - Document breaking changes
