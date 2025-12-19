import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
// Using process.cwd() to get the project root directory
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

async function testQuery() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Missing Supabase environment variables!')
      console.error('Please check your .env.local file and ensure it contains:')
      console.error('  - NEXT_PUBLIC_SUPABASE_URL')
      console.error('  - NEXT_PUBLIC_SUPABASE_ANON_KEY')
      process.exit(1)
    }

    if (supabaseUrl === 'your-project-url-here' || supabaseAnonKey === 'your-anon-key-here') {
      console.error('❌ Please update .env.local with your actual Supabase credentials!')
      console.error('You can find these in your Supabase project settings:')
      console.error('https://app.supabase.com/project/_/settings/api')
      process.exit(1)
    }

    console.log('🔌 Connecting to Supabase...')
    console.log('📍 URL:', supabaseUrl.replace(/\/$/, ''))
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Parse arguments: table name and optional --count flag
    const args = process.argv.slice(2)
    const tableName = args.find(arg => !arg.startsWith('--')) || 'people'
    const countOnly = args.includes('--count')
    
    if (countOnly) {
      // Get just the count
      console.log(`\n📊 Counting records in table: ${tableName}`)
      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.error('\n❌ Count error:', error.message)
        if (error.message.includes('relation') || error.message.includes('does not exist')) {
          console.error(`\n💡 Hint: The table "${tableName}" doesn't exist.`)
          console.error('   You can specify a different table name as an argument:')
          console.error('   npm run test:query your_table_name --count')
        } else {
          console.error('\n💡 Make sure:')
          console.error('   1. Your Supabase credentials are correct in .env.local')
          console.error('   2. The table name is correct')
          console.error('   3. Your Supabase project is active')
        }
        process.exit(1)
      }

      console.log(`\n✅ Total records: ${count || 0}`)
    } else {
      // Original query with count
      console.log(`\n📊 Querying table: ${tableName}`)
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .limit(5)

      if (error) {
        console.error('\n❌ Query error:', error.message)
        if (error.message.includes('relation') || error.message.includes('does not exist')) {
          console.error(`\n💡 Hint: The table "${tableName}" doesn't exist.`)
          console.error('   You can specify a different table name as an argument:')
          console.error('   npm run test:query your_actual_table_name')
        } else {
          console.error('\n💡 Make sure:')
          console.error('   1. Your Supabase credentials are correct in .env.local')
          console.error('   2. The table name is correct')
          console.error('   3. Your Supabase project is active')
        }
        process.exit(1)
      }

      console.log('\n✅ Query successful!')
      console.log('📋 Results:', JSON.stringify(data, null, 2))
      console.log(`\n📊 Showing ${data?.length || 0} of ${count || 0} total row(s)`)
    }
  } catch (error) {
    console.error('\n❌ Connection error:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
    }
    process.exit(1)
  }
}

testQuery()

